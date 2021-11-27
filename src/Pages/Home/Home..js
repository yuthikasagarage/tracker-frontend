import React, { useEffect, useState } from 'react'
import LineChart from '../../components/LineChart/LineChart'
import classNames from './Home.module.scss'
import { Input, Form, Spin, DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { getUserRecords, createRecord } from '../../api/trackerApi';
import Button from '../../components/common/Button'
import moment from "moment";


const Home = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
 
    const lastCreate = useSelector(state => state.tracker.lastCreate)
    const recs = useSelector(state => state.tracker.records)

    const [showAddWeightModal, setShowAddWeightModal] = useState(false);
    const records = JSON.parse(JSON.stringify(recs));
    useEffect(() => {
        dispatch(getUserRecords());
    }, [dispatch, lastCreate])
   
    const sendWeightRecord = async () => {
      try {
        await form.validateFields();
      } catch (error) {
        return;
      }
      const date = form.getFieldValue('recorded-date').toISOString()
      dispatch(createRecord({ weight: parseFloat(+form.getFieldValue('weight')), recorded_date: date }));      
    }

    const showModal = () => {
        setShowAddWeightModal(true);
    }

    return (
        <>
        <div className={classNames.contentWrapper}>
             <div style={{ height: 500, width: "inherit" }}>
            {records && <LineChart records={records} />}
            </div>

            <div className={classNames.controlsWrapper}>
                <Button onClick={showModal}>Add new weight measurement</Button>
            </div>
        </div>
       
            <Modal title="Add your weight measurements"
                visible={showAddWeightModal}
                onOk={sendWeightRecord}
                onCancel={() => {
                  setShowAddWeightModal(false)
              
                  form.resetFields(["weight", "Date"]);
                  
                }}
                style={{ maxHeight: "90vh" }}
                width={500}
                centered
                className={classNames.modal}
                bodyStyle={{
                    padding: 20,
                    margin: 0,
                    backgroundColor: "#f5f6fa",
                }}>         
                <Form
                   form={form}
                  layout="vertical"        
                  onFinish={() => console.log("as")}
                >
                    <>
                       <Form.Item
                         label="Add your weight"
                         name="weight"
                         rules={[
                           {
                             required: true,
                             message: "Weight is Required.",
                           },
                         ]}
                       >
                        <Input className={classNames.input} />
                       </Form.Item>
                       <Form.Item
                         label="Date"
                         name="recorded-date"
                         rules={[
                           {
                             required: true,
                             message: "Date is required",
                           },
                         ]}
                       >
                         <DatePicker
                           format="MMMM Do YYYY, h:mm a"                          
                           className={classNames.input}
                           showTime={{
                             defaultValue: moment("00:00:00", "h:mm a"),
                           }}
                         />
                       </Form.Item>
                     </>
                 </Form>
            
           </Modal>     
        </>
    )
}

export default Home
