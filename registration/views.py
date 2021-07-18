import random
import string

from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .forms import TeamForm, ParticipantForm


class RegisterView(APIView):
    def post(self, request):
        
        teamData = {
            'teamName': request.data.pop('teamName'),
        }
        form = TeamForm(teamData)
        if form.is_valid():
            # generate password for team
            password = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8))
            print(password)

            teamLeader = request.data.get('teamLeader')
            member1 = request.data.get('member1')
            member2 = request.data.get('member2')

            if teamLeader is not None and member1 is not None or member2 is not None:

                teamLeader['password'] = password
                form1 = ParticipantForm(teamLeader)
                if not form1.is_valid():
                    print(form.errors)
                    return Response({'error': form1.errors}, status=status.HTTP_400_BAD_REQUEST)

                if member1 is not None:
                    member1['password'] = password
                    form2 = ParticipantForm(member1)
                    if not form2.is_valid():
                        print(form.errors)
                        return Response({'error': form2.errors}, status=status.HTTP_400_BAD_REQUEST)
                
                if member2 is not None:
                    member2['password'] = password
                    form3 = ParticipantForm(member2)
                    if not form3.is_valid():
                        print(form.errors)
                        return Response({'error': form3.errors}, status=status.HTTP_400_BAD_REQUEST)
                
                team = form.save()

                to_list=[]
                teamLeader['team'] = team.id
                to_list.append(teamLeader['email'])
                ParticipantForm(teamLeader).save()
                if member1 is not None:
                    member1['team'] = team.id
                    to_list.append(member1['email'])
                    ParticipantForm(member1).save()
                if member2 is not None:
                    member2['team'] = team.id
                    to_list.append(member2['email'])
                    ParticipantForm(member2).save()
                

                def send_email(subject, message, from_email, to_list):
                    send_mail(subject, message, from_email, to_list, fail_silently=True)

                subject = 'Team Registration Successful!'
                message = 'Your team has been registered successfully. Your team password is: ' + password
                from_email = settings.EMAIL_HOST_USER
                send_email(subject, message, from_email, to_list)

                return Response({'success': 'Your team has been registered successfully.'}, status=status.HTTP_201_CREATED)

                
            else:
                return Response({'error': 'Team Leader and Member 1 or Member 2 are required'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'message':'Team Name is taken'}, status=status.HTTP_400_BAD_REQUEST)
