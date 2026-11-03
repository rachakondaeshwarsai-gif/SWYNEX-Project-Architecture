
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Bell,
  Trash2
} from 'lucide-react'
import './App.css'

const API = 'http://localhost:3000/api/tasks'

// Convert backend task data into frontend format
function formatTask(task) {
  const statusMap = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed'
  }

  return {
    ...task,
    priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
    status: statusMap[task.status] || task.status
  }
}

function App() {
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch tasks when the application loads
  useEffect(() => {
    fetchTasks()
  }, [])

  // GET: Fetch all tasks from MySQL through the backend
  async function fetchTasks() {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get(API)

      setTasks(response.data.data.map(formatTask))
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Unable to connect to the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // POST: Create a new task
  async function addTask(e) {
    e.preventDefault()

    if (!title.trim()) return

    try {
      const response = await axios.post(API, {
        title: title.trim(),
        priority: priority,
        status: 'pending'
      })

      setTasks(prev => [
        formatTask(response.data.data),
        ...prev
      ])

      setTitle('')
      setPriority('medium')
      setShowForm(false)
    } catch (err) {
      console.error('Error creating task:', err)
      alert(err.response?.data?.message || 'Unable to create task.')
    }
  }

  // PUT: Update task status
  async function changeStatus(id, status) {
    const statusMap = {
      'Pending': 'pending',
      'In Progress': 'in_progress',
      'Completed': 'completed'
    }

    try {
      const response = await axios.put(`${API}/${id}`, {
        status: statusMap[status]
      })

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? formatTask(response.data.data) : task
        )
      )
    } catch (err) {
      console.error('Error updating task:', err)
      alert('Unable to update task status.')
    }
  }

  // DELETE: Remove a task
  async function deleteTask(id) {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await axios.delete(`${API}/${id}`)

      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
      alert('Unable to delete task.')
    }
  }

  // Search tasks
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  // Dashboard statistics
  const completed = tasks.filter(
    task => task.status === 'Completed'
  ).length

  const pending = tasks.filter(
    task => task.status === 'Pending'
  ).length

  const progress = tasks.filter(
    task => task.status === 'In Progress'
  ).length

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>SWYNEX<span>.</span></h2>

        <p className="menu-label">WORKSPACE</p>

        <a href="#dashboard" className="nav active">
          <LayoutDashboard size={19} />
          Dashboard
        </a>

        <a href="#tasks" className="nav">
          <ClipboardList size={19} />
          My Tasks
        </a>

        <a href="#tasks" className="nav">
          <Clock size={19} />
          In Progress
        </a>

        <a href="#tasks" className="nav">
          <CheckCircle2 size={19} />
          Completed
        </a>

        <div className="sidebar-bottom">
          Student Task Management
        </div>
      </aside>

      {/* Main content */}
      <main className="main" id="dashboard">

        {/* Header */}
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Manage your work and stay productive.</p>
          </div>

          <div className="top-actions">
            <Bell size={20} />
            <div className="avatar">ES</div>
          </div>
        </header>

        {/* Welcome section */}
        <section className="welcome">
          <div>
            <span>YOUR WORKSPACE</span>
            <h2>Welcome back!</h2>
            <p>Here's an overview of your tasks today.</p>
          </div>

          <button onClick={() => setShowForm(!showForm)}>
            <Plus size={18} />
            Add New Task
          </button>
        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
            <ClipboardList />
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <h2>{pending}</h2>
            <Clock />
          </div>

          <div className="stat-card">
            <span>In Progress</span>
            <h2>{progress}</h2>
            <LayoutDashboard />
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h2>{completed}</h2>
            <CheckCircle2 />
          </div>

        </section>

        {/* Add task form */}
        {showForm && (
          <form className="task-form" onSubmit={addTask}>

            <h3>Create a new task</h3>

            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter task title"
              maxLength={120}
              required
            />

            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>

            <button type="submit">
              Create Task
            </button>

          </form>
        )}

        {/* Tasks section */}
        <section className="tasks-section" id="tasks">

          <div className="section-heading">
            <div>
              <h2>Recent Tasks</h2>
              <p>Keep track of your daily activities.</p>
            </div>

            <div className="search">
              <Search size={17} />

              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tasks..."
              />
            </div>
          </div>

          <div className="task-list">

            {loading && (
              <p className="empty">Loading tasks...</p>
            )}

            {!loading && error && (
              <div className="empty">
                <p>{error}</p>
                <button onClick={fetchTasks}>
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && filteredTasks.map(task => (

              <div className="task-row" key={task.id}>

                <div className="task-info">
                  <strong>{task.title}</strong>

                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority} priority
                  </span>
                </div>

                <select
                  value={task.status}
                  onChange={e => changeStatus(task.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            ))}

            {!loading && !error && filteredTasks.length === 0 && (
              <p className="empty">
                {search ? 'No matching tasks found.' : 'No tasks available. Create your first task!'}
              </p>
            )}

          </div>
        </section>

      </main>
    </div>
  )
}

export default App
