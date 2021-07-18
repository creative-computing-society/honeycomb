import random
import string

from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
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
                    return Response({'error': form1.errors})

                if member1 is not None:
                    member1['password'] = password
                    form2 = ParticipantForm(member1)
                    if not form2.is_valid():
                        print(form.errors)
                        return Response({'error': form2.errors})
                
                if member2 is not None:
                    member2['password'] = password
                    form3 = ParticipantForm(member2)
                    if not form3.is_valid():
                        print(form.errors)
                        return Response({'error': form3.errors})
                
                team = form.save()
                teamLeader['team'] = team.id
                ParticipantForm(teamLeader).save()
                if member1 is not None:
                    member1['team'] = team.id
                    ParticipantForm(member1).save()
                if member2 is not None:
                    member2['team'] = team.id
                    ParticipantForm(member2).save()
                
                # Todo: send email to participants with password
                
                subject = 'CCS Laberinto'
                message = f'Hi {teamName}, Password for the portal is {password}'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [teamLeader.email, member1.email, member2.email]
                send_mail( subject, message, email_from, recipient_list )

                return Response("Successfully registered!")

                

            else:
                return Response({'error': 'Team Leader and Member 1 or Member 2 are required'})

        else:
            return Response("Team Name is taken.", status=400)
