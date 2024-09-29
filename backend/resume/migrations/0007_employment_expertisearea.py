# Generated by Django 5.0.2 on 2024-09-29 03:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0006_educationdegree_educationlevel_educationresult_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255)),
                ('company_business', models.CharField(max_length=255)),
                ('designation', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=255)),
                ('employment_period_start', models.DateField()),
                ('employment_period_end', models.DateField(blank=True, null=True)),
                ('currently_working', models.BooleanField(default=False)),
                ('responsibilities', models.TextField()),
                ('company_location', models.TextField()),
                ('cv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resume.curriculumvitae')),
            ],
        ),
        migrations.CreateModel(
            name='ExpertiseArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(blank=True, max_length=255, null=True)),
                ('duration', models.CharField(help_text='duration(Month)', max_length=255)),
                ('employment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resume.employment')),
            ],
        ),
    ]