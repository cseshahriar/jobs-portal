# Generated by Django 5.0.2 on 2024-03-03 16:02

import django.core.validators
import django.db.models.deletion
import job.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
                ('description', models.TextField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('job_type', models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary'), ('Internship', 'Internship')], default='Permanent', max_length=50)),
                ('education', models.CharField(choices=[('High School', 'Highschool'), ('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('PhD', 'Phd')], default='Bachelors', max_length=50)),
                ('industry', models.CharField(choices=[('Information Technology', 'It'), ('Finance', 'Finance'), ('Health Care', 'Healthcare'), ('Education', 'Education'), ('Manufacturing', 'Manufacturing'), ('Government', 'Government'), ('Retail', 'Retail'), ('Business', 'Business'), ('Other', 'Other')], default='Business', max_length=50)),
                ('experience', models.CharField(choices=[('No Experience', 'No Experience'), ('1 Year', 'One Year'), ('2 Years', 'Two Year'), ('3 Years above', 'Three Year Plus')], default='No Experience', max_length=50)),
                ('salary', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000000)])),
                ('positions', models.IntegerField(default=1)),
                ('company', models.CharField(max_length=200, null=True)),
                ('last_date', models.DateTimeField(default=job.models.return_date_time)),
                ('latitude', models.DecimalField(decimal_places=6, default=0.0, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, default=0.0, max_digits=9)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='jobs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
