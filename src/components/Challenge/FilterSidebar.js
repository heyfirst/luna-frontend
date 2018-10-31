import React from 'react'
import { Checkbox } from 'antd'
import Card from '../Core/Card'

class FilterSidebar extends React.Component {
  render() {
    return (
      <Card>
        <div>
          <h5>ระดับความยาก</h5>
          <div>
            <Checkbox>ระดับง่าย</Checkbox>
          </div>
          <div>
            <Checkbox>ระดับปานกลาง</Checkbox>
          </div>
          <div>
            <Checkbox>ระดับยาก</Checkbox>
          </div>
        </div>
        <hr className="my-3" />
        <div>
          <h5>สถานะ</h5>
          <div>
            <Checkbox>ทำเสร็จแล้ว</Checkbox>
          </div>
          <div>
            <Checkbox>ยังไม่ได้ทำ</Checkbox>
          </div>
        </div>
        <hr className="my-3" />
        <div>
          <h5>หัวข้อการเรียนรู้</h5>
          <div>
            <Checkbox>Data Type</Checkbox>
          </div>
          <div>
            <Checkbox>String</Checkbox>
          </div>
          <div>
            <Checkbox>Array</Checkbox>
          </div>
          <div>
            <Checkbox>Loop</Checkbox>
          </div>
          <div>
            <Checkbox>Condition</Checkbox>
          </div>
          <div>
            <Checkbox>Data Structure</Checkbox>
          </div>
        </div>
      </Card>
    )
  }
}

export default FilterSidebar
