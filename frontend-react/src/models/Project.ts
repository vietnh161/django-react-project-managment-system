import { User } from './User';

export interface Project {
  id: string;
  name: string;
  key: string;
  image?: string;
  description?: string;
  owner: string;
  created_at: string;
  updated_at: string;
}

export interface KanbanColumn {
  id: number;
  name: string;
  status: string;
  position: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: number;
  joined_at: string;
  user: User;
}

export interface Sprint {
  id: number;
  name: string;
  is_active: boolean;
  end_date: string;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
  created_at: string;
}

export interface Task {
  id: number;
  alias_id: string;
  title: string;
  description: string;
  image: string;
  background: string;
  assigned_to: User;
  kanban_column: KanbanColumn;
  sprint: Sprint;
  parent?: number;
  tags: Tag[];
  status: string;
  priority: string;
  type: string;
  project: number;
  subtasks: number[];
  created_at: string;
}

export interface ProjectDetails {
  created_at: string;
  description: string;
  id: number;
  kanban_columns: User;
  members: ProjectMember[];
  name: string;
  owner: User;
  sprints: Sprint[];
  tags: Tag[];
  tasks: Task[];
}
