import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import { Select } from 'antd'
import store from './store'
const Option = Select.Option

const TaskLink = styled(Link)`
  color: #666;

  &:hover,
  &:active {
    color: #222;
  }
`

const TaskCard = styled.div`
  border-radius: 10px;

  &.doing {
    border-color: #47c9d1;
  }

  .card-body {
    padding: 0.6rem;
  }

  .task-name,
  .task-detail {
    .label {
      font-size: 0.8rem;
    }
    .value {
      font-size: 1rem;
    }
  }

  .task-detail {
    display: flex;
  }

  .task-status {
    cursor: pointer;
    user-select: none;
    color: #47c9d1;
    border: 1px solid #47c9d1;
    padding: 0.4rem 1rem;
    border-radius: 10px;

    &.solved {
      background: #47c9d1;
      color: white;
      font-weight: 600;
    }

    &.locked {
      border: 1px solid #ccc;
      color: #ccc;
    }
  }

  span {
    color: white;
    padding: 0.15rem 0.25rem;
    border-radius: 5px;

    &.Beginner {
      background-color: #47d1a8;
    }
    &.Intermediate {
      background-color: #00cce8;
    }
    &.Advance {
      background-color: #ff73ae;
    }
  }

  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 4px 0 rgba(120, 120, 120, 0.12), 0 2px 10px 0 rgba(120, 120, 120, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px 0 rgba(120, 120, 120, 0.15), 0 2px 10px 0 rgba(120, 120, 120, 0.25);
  }
`

const Difficult = difficult => {
  if (difficult === 'Beginner') {
    return <span className="Beginner">ง่าย</span>
  }
  if (difficult === 'Intermediate') {
    return <span className="Intermediate">ปานกลาง</span>
  }
  if (difficult === 'Advance') {
    return <span className="Advance">ยาก</span>
  }
}

class TaskItem extends React.Component {
  gotoEditPage = () => {
    store.setPage('TASK_EDIT')
    store.setEditTaskID(this.props.taskID)
  }

  render() {
    const { name, difficult, topic, passCount } = this.props
    return (
      <TaskCard className={`card text-left mb-3`} onClick={() => this.gotoEditPage()}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <div className="task-name mx-1">
              <div className="value">{name}</div>
            </div>
            <div className="task-detail mt-1">
              <div className="detail d-flex mx-1">
                <div className="label">ความยาก: {Difficult(difficult)}</div>
              </div>
              {topic && (
                <div className="detail d-flex mx-1">
                  <div className="label">
                    หัวข้อการเรียนรู้: <b>{topic}</b>
                  </div>
                </div>
              )}
              {passCount && (
                <div className="detail d-flex mx-1">
                  <div className="label">
                    จำนวนผู้ที่ผ่านโจทย์ข้อนี้: <b>{passCount} คน</b>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={`task-status solve`}>แก้ไข</div>
          </div>
        </div>
      </TaskCard>
    )
  }
}

export default TaskItem
