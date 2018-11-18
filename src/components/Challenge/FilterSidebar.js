import React from 'react'
import { Radio } from 'antd'
import Card from '../Core/Card'
import ChallangeStore from './store'
import { observer } from 'mobx-react'

const RadioGroup = Radio.Group

@observer
class FilterSidebar extends React.Component {
  render() {
    return (
      <Card>
        <div>
          <h5>ระดับความยาก</h5>
          <RadioGroup
            onChange={e => ChallangeStore.onLevelChange(e.target.value)}
            value={ChallangeStore.level}
          >
            <div>
              <Radio value={'All'}>รวมทั้งหมด</Radio>
            </div>
            <div>
              <Radio value={'Beginner'}>ระดับง่าย</Radio>
            </div>
            <div>
              <Radio value={'Intermediate'}>ระดับปานกลาง</Radio>
            </div>
            <div>
              <Radio value={'Advance'}>ระดับยาก</Radio>
            </div>
          </RadioGroup>
        </div>
        <hr className="my-3" />
        {/* <div>
          <h5>สถานะ</h5>
          <RadioGroup
            onChange={e => ChallangeStore.onSolveChange(e.target.value)}
            value={ChallangeStore.solve}
          >
            <div>
              <Radio value={'All'}>รวมทั้งหมด</Radio>
            </div>
            <div>
              <Radio value={'solved'}>ทำเสร็จแล้ว</Radio>
            </div>
            <div>
              <Radio value={'unsolved'}>ยังไม่ได้ทำ</Radio>
            </div>
          </RadioGroup>
        </div> */}
        {/* <hr className="my-3" /> */}
        <div>
          <h5>หัวข้อการเรียนรู้</h5>
          <RadioGroup
            onChange={e => ChallangeStore.onTopicChange(e.target.value)}
            value={ChallangeStore.topic}
          >
            <div>
              <Radio value={'All'}>รวมทั้งหมด</Radio>
            </div>
            <div>
              <Radio value={'Data Type'}>Data Type</Radio>
            </div>
            <div>
              <Radio value={'String'}>String</Radio>
            </div>
            <div>
              <Radio value={'Array'}>Array</Radio>
            </div>
            <div>
              <Radio value={'Loop'}>Loop</Radio>
            </div>
            <div>
              <Radio value={'Condition'}>Condition</Radio>
            </div>
            <div>
              <Radio value={'Data Structure'}>Data Structure</Radio>
            </div>
          </RadioGroup>
        </div>
      </Card>
    )
  }
}

export default FilterSidebar
