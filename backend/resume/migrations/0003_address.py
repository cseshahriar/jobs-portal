# Generated by Django 5.0.2 on 2024-09-28 15:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0001_initial'),
        ('resume', '0002_remove_profile_occupation_remove_profile_region_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('village', models.TextField(help_text='Type your House No/Road/Village')),
                ('inside_bangladesh', models.BooleanField(default=False)),
                ('is_present', models.BooleanField(default=False)),
                ('is_permanent', models.BooleanField(default=False)),
                ('country', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='address.country')),
                ('cv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resume.curriculumvitae')),
                ('district', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='address.district')),
                ('post_office', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='address.postoffice')),
                ('thana', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='address.thana')),
            ],
        ),
    ]
