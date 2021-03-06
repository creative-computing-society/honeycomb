import uuid
from django.contrib.auth.models import AbstractBaseUser
from registration.managers import UserManager
from django.db import models
from django.core.validators import RegexValidator

DISCORD_REGEX = "^.{3,32}#[0-9]{4}$"
EMAIL_REGEX = "^[A-Za-z0-9._~+-]+@thapar\.edu$"

class Team(models.Model):
    teamName = models.CharField(max_length=100, unique=True)
    score = models.IntegerField(default=0)
    
    def __str__(self):
        return self.teamName

class Participant(AbstractBaseUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True,
        validators=[
            RegexValidator(
                regex=EMAIL_REGEX,
                message='Invalid email address',
                code='invalid_email'
            )
        ],
    )
    discord_ID = models.CharField(
        max_length=255,
        validators=[
            RegexValidator(
                regex=DISCORD_REGEX,
                message="Enter a valid discord ID",
                code="invalid"
            )
        ],
        default="",
        unique=True
    )
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True)
    level = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name",]
    
    def __str__(self):
        return self.name

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

