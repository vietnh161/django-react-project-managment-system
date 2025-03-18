from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    image = models.CharField(max_length=250, null=True, blank=True)

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f"Profile of {self.user.username}"


class Project(models.Model):
    name = models.CharField(max_length=100)
    key = models.CharField(
        max_length=100,
        unique=True,
        validators=[
            RegexValidator(
                regex=r"^[A-Za-z0-9]+$",
                message="Key can only contain letters and numbers.",
                code="invalid_alias_id",
            )
        ],
    )

    image = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owned_projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.name


class ProjectMember(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="members"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="project_memberships"
    )
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "project",
            "user",
        )  # Không cho phép trùng thành viên trong dự án
        verbose_name = "Project Member"
        verbose_name_plural = "Project Members"

    def __str__(self):
        return f"{self.user.username} in {self.project.name}"


class KanbanColumn(models.Model):
    STATUS_CHOICES = (
        ("TODO", "To Do"),
        ("IN_PROGRESS", "In Progress"),
        ("BLOCKED", "Blocked"),
        ("DONE", "Done"),
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="kanban_columns"
    )
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="TODO")
    position = models.IntegerField()  # Thứ tự cột trong Kanban Board
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "project",
            "name",
        )  # Không cho phép trùng tên cột trong cùng dự án
        verbose_name = "Kanban Column"
        verbose_name_plural = "Kanban Columns"

    def __str__(self):
        return f"{self.name} ({self.project.name})"


class Sprint(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="sprints"
    )
    name = models.CharField(max_length=50)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Sprint"
        verbose_name_plural = "Sprints"

    def clean(self):
        # Kiểm tra end_date phải lớn hơn start_date
        if self.end_date <= self.start_date:
            raise ValidationError("End date must be greater than start date.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Gọi kiểm tra ràng buộc trước khi lưu
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.project.name})"


class Tag(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tags")
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        unique_together = ("project", "name")

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = (
        ("TODO", "To Do"),
        ("IN_PROGRESS", "In Progress"),
        ("BLOCKED", "Blocked"),
        ("DONE", "Done"),
    )

    TASK_TYPES = (
        ("USER_STORY", "User Story"),
        ("BUG", "Bug"),
        ("FEATURE", "Feature"),
    )

    PRIORITY_LEVELS = (
        ("HIGHEST", "Highest"),
        ("HIGH", "High"),
        ("MEDIUM", "Medium"),
        ("LOW", "Low"),
        ("LOWEST", "Lowest"),
    )

    aliasId = models.CharField(max_length=200, null=True, blank=True, unique=True)
    image = models.CharField(max_length=250, null=True, blank=True)
    background = models.CharField(max_length=250, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_tasks",
    )
    kanban_column = models.ForeignKey(
        KanbanColumn,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tasks",
    )
    sprint = models.ForeignKey(
        Sprint, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="TODO")
    tags = models.ManyToManyField(Tag, blank=True, related_name="tasks")
    type = models.CharField(max_length=20, choices=TASK_TYPES, default="USER_STORY")
    priority = models.CharField(
        max_length=20, choices=PRIORITY_LEVELS, default="MEDIUM"
    )
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="subtasks"
    )
    deadline = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="created_tasks"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)

        if not self.aliasId:
            initials = self.project.key
            self.aliasId = f"{initials}-{self.id}"
            super().save(update_fields=["aliasId"])

    def get_all_subtasks(self):
        return Task.objects.filter(parent=self)


class Notification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"

    def __str__(self):
        return f"Notification for {self.user.username}: {self.message[:50]}"
