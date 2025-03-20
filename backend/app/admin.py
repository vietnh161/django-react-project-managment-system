from django.contrib import admin
from .models import (
    Tag,
    UserProfile,
    Project,
    ProjectMember,
    KanbanColumn,
    Sprint,
    Task,
    Notification,
)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Project._meta.fields]


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ProjectMember._meta.fields]


@admin.register(KanbanColumn)
class KanbanColumnAdmin(admin.ModelAdmin):
    list_display = [field.name for field in KanbanColumn._meta.fields]


@admin.register(Sprint)
class SprintAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Sprint._meta.fields]


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = [
        "pk",
        "alias_id",
        "title",
        "description",
        "assigned_to",
        "status",
        "type",
        "priority",
        "created_at",
        "updated_at",
    ]


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Notification._meta.fields]


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserProfile._meta.fields]


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Tag._meta.fields]
