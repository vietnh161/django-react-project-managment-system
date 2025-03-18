from django.core.management.base import BaseCommand
import json
from django.utils import timezone
from django.core.files import File
from django.contrib.auth.models import User
from app.models import (
    UserProfile,
    Project,
    ProjectMember,
    KanbanColumn,
    Sprint,
    Task,
    Tag,
)


class Command(BaseCommand):
    help = "Load data from JSON file into the database"

    def add_arguments(self, parser):
        parser.add_argument("json_file", type=str, help="Path to the JSON file")
        parser.add_argument(
            "--clean", action="store_true", help="Xóa dữ liệu cũ trước khi thêm mới"
        )

    def handle(self, *args, **options):
        json_file_path = options["json_file"]
        clean = options["clean"]
        with open(json_file_path, "r") as file:
            data = json.load(file)

        if clean:
            self.stdout.write(self.style.WARNING("Đang xóa dữ liệu cũ..."))
            UserProfile.objects.all().delete()
            Task.objects.all().delete()
            Tag.objects.all().delete()
            Sprint.objects.all().delete()
            KanbanColumn.objects.all().delete()
            ProjectMember.objects.all().delete()
            Project.objects.all().delete()
            User.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("Đã xóa dữ liệu cũ!"))

        for user_data in data.get("users", []):
            user, _ = User.objects.get_or_create(
                username=user_data["username"],
                first_name=user_data["first_name"],
                last_name=user_data["last_name"],
                email=user_data["email"],
            )
            user.set_password(user_data["password"])
            user.save()
            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.image = user_data["image"]
            profile.save()

        for project_data in data.get("projects", []):
            owner = User.objects.get(username=project_data["owner"])
            project, _ = Project.objects.get_or_create(
                name=project_data["name"],
                defaults={
                    "description": project_data.get("description"),
                    "short_name": project_data.get("short_name"),
                    "owner": owner,
                },
            )

            for member_data in project_data.get("members", []):
                member = User.objects.get(username=member_data["username"])
                ProjectMember.objects.get_or_create(project=project, user=member)

            for column_data in project_data.get("kanban_columns", []):
                KanbanColumn.objects.get_or_create(
                    project=project,
                    status=column_data["status"],
                    name=column_data["name"],
                    defaults={"position": column_data["position"]},
                )

            for sprint_data in project_data.get("sprints", []):
                Sprint.objects.get_or_create(
                    project=project,
                    name=sprint_data["name"],
                    defaults={
                        "start_date": timezone.datetime.fromisoformat(
                            sprint_data["start_date"]
                        ),
                        "end_date": timezone.datetime.fromisoformat(
                            sprint_data["end_date"]
                        ),
                    },
                )

            for tag_name in project_data.get("tags", []):
                Tag.objects.get_or_create(project=project, name=tag_name)

            def create_task(task_data, parent=None):
                assigned_to = (
                    User.objects.get(username=task_data["assigned_to"])
                    if task_data.get("assigned_to")
                    else None
                )
                kanban_column = KanbanColumn.objects.get(
                    project=project, name=task_data["kanban_column"]
                )
                sprint = (
                    Sprint.objects.get(project=project, name=task_data["sprint"])
                    if task_data.get("sprint")
                    else None
                )
                deadline = (
                    timezone.datetime.fromisoformat(task_data["deadline"])
                    if task_data.get("deadline")
                    else None
                )

                task, _ = Task.objects.get_or_create(
                    project=project,
                    title=task_data["title"],
                    defaults={
                        "description": task_data.get("description"),
                        "assigned_to": assigned_to,
                        "kanban_column": kanban_column,
                        "sprint": sprint,
                        "parent": parent,
                        "status": task_data["status"],
                        "type": task_data["type"],
                        "priority": task_data["priority"],
                        "deadline": deadline,
                    },
                )

                tags = [
                    Tag.objects.get(project=project, name=tag_name)
                    for tag_name in task_data.get("tags", [])
                ]
                task.tags.set(tags)

                for subtask_data in task_data.get("subtasks", []):
                    create_task(subtask_data, parent=task)

            for task_data in project_data.get("tasks", []):
                create_task(task_data)

        self.stdout.write(
            self.style.SUCCESS("Dữ liệu từ JSON đã được thêm thành công!")
        )
