# Generated by Django 5.1.4 on 2025-03-20 04:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_alter_tag_name_alter_tag_unique_together"),
    ]

    operations = [
        migrations.RenameField(
            model_name="task",
            old_name="aliasId",
            new_name="alias_id",
        ),
    ]
