from datetime import date

from django.db.models import Count

from projects.models import Project
from tasks.models import Task
from django.contrib.auth.models import User


def get_dashboard_statistics():
    """
    Returns overall dashboard statistics.
    """

    total_projects = Project.objects.count()

    active_projects = Project.objects.filter(
        status__iexact="Active"
    ).count()

    completed_projects = Project.objects.filter(
        status__iexact="Completed"
    ).count()

    total_tasks = Task.objects.count()

    completed_tasks = Task.objects.filter(
        status__iexact="Completed"
    ).count()

    pending_tasks = Task.objects.filter(
        status__iexact="Pending"
    ).count()

    in_progress_tasks = Task.objects.filter(
        status__iexact="In Progress"
    ).count()

    overdue_tasks = (
        Task.objects.filter(
            deadline__lt=date.today()
        )
        .exclude(
            status__iexact="Completed"
        )
        .count()
    )

    completion_rate = 0

    if total_tasks > 0:
        completion_rate = round(
            (completed_tasks / total_tasks) * 100,
            2,
        )

    return {
        "projects": {
            "total": total_projects,
            "active": active_projects,
            "completed": completed_projects,
        },
        "tasks": {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": pending_tasks,
            "in_progress": in_progress_tasks,
            "overdue": overdue_tasks,
        },
        "completion_rate": completion_rate,
    }


def get_task_status_distribution():
    """
    Returns task count grouped by status.
    """

    task_status = (
        Task.objects.values("status")
        .annotate(count=Count("id"))
        .order_by("status")
    )

    return list(task_status)


def get_project_summary():
    """
    Returns project-wise task summary.
    """

    summary = []

    projects = Project.objects.all()

    for project in projects:

        total_tasks = Task.objects.filter(
            project=project
        ).count()

        completed_tasks = Task.objects.filter(
            project=project,
            status__iexact="Completed"
        ).count()

        pending_tasks = Task.objects.filter(
            project=project
        ).exclude(
            status__iexact="Completed"
        ).count()

        completion_rate = 0

        if total_tasks > 0:
            completion_rate = round(
                (completed_tasks / total_tasks) * 100,
                2,
            )

        summary.append({
            "project_id": project.id,
            "project_name": project.name,
            "status": project.status,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "completion_rate": completion_rate,
        })

    return summary


def get_recent_activity(limit=10):
    """
    Returns the most recent tasks.
    """

    recent_tasks = (
        Task.objects.select_related(
            "project",
            "assigned_to",
        )
        .order_by("-id")[:limit]
    )

    activity = []

    for task in recent_tasks:
        activity.append({
            "task_id": task.id,
            "title": task.title,
            "project": task.project.name,
            "status": task.status,
            "assigned_to": (
                task.assigned_to.username
                if task.assigned_to
                else None
            ),
            "deadline": task.deadline,
        })

    return activity

def get_workload_distribution():
    """
    Returns number of tasks assigned to each user.
    """

    workload = []

    users = User.objects.all()

    for user in users:

        task_count = Task.objects.filter(
            assigned_to=user
        ).count()

        workload.append({
            "username": user.username,
            "task_count": task_count,
        })

    return workload