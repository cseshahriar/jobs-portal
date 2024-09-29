# Generated by Django 5.0.2 on 2024-09-28 17:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0004_carrerinformation'),
    ]

    operations = [
        migrations.CreateModel(
            name='releventInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carrer_summery', models.TextField()),
                ('special_qualification', models.TextField()),
                ('keywords', models.TextField(help_text='Comma seperated Python, Django')),
                ('cv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resume.curriculumvitae')),
            ],
        ),
    ]