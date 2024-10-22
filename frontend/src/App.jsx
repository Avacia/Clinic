import { useQuery } from 'react-query'
import { useState } from 'react'
import './App.css'

function App() {
  const {data, isLoading, error} = useQuery("Nurse Info", getDataFromBackend)
  const [month, setMonth] = useState("9月")
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  const monthIndexMap = {
    "1月": 0,
    "2月": 1,
    "3月": 2,
    "4月": 3,
    "5月": 4,
    "6月": 5,
    "7月": 6,
    "8月": 7,
    "9月": 8,
    "10月": 9,
    "11月": 10,
    "12月": 11,
  }

  async function getDataFromBackend(){
    const res = await fetch("http://localhost:5000/getNurseData")
    if(!res.ok){
      throw new Error("Network response was not ok")
    }
    return res.json()
  }

  if(isLoading){
    return(<div>Loading... </div>)
  }

  if(error){
    return(<div>{error}</div>)
  }


  return (
    <div className="app">

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((monthOption, index) => (
          <option key={index} value={monthOption}>
            {monthOption}
          </option>
        ))}
      </select>

      { 
        data.map((nurse, index) => {
          const selectMonthIndex = monthIndexMap[month]
          const selectMonthData = nurse.months[selectMonthIndex]

          return(
              <div className="cardContainer" key={index}>
                <div className="nurseInfo">
                  <div className="personInfo">
                    <h1>{nurse.name}</h1>
                    <p>生日: {nurse.birthday}</p>
                  </div>
                  <p>到職日期: {nurse.start_work_date}</p>
                </div>
                
                <div className="detailContainer">
                  <div className="salaryInfo">
                    <p>基本薪資: {selectMonthData.salary}</p>
                    <p>工作時數: {selectMonthData.total_hr_working}</p>
                    <p>加班時數: {selectMonthData.extra_hr_working}</p>
                    <p>加班費: {selectMonthData.extra_working_salary}</p>
                  </div>
                  
                  <div className="insuranceInfo">
                    <p>勞保自付額: {selectMonthData.laberInsurance}</p>
                    <p>健保自付額: {selectMonthData.healthInsurance}</p>
                  </div>

                  <div className="leaveInfo">
                    <div className="annualInfo">
                      <p>特休日期: {selectMonthData.annual_leave_date}</p>
                      <p>特休天數: {selectMonthData.annual_leave}</p>
                      <p>特休餘日: {selectMonthData.annual_leave_left}</p>
                    </div>

                    <div className="sickInfo">
                      <p>病假日期: {selectMonthData.sick_leave_date}</p>
                      <p>病假天數: {selectMonthData.sick_leave}</p>
                    </div>

                    <div className="personalInfo">
                      <p>事假日期: {selectMonthData.personal_leave_date}</p>
                      <p>事假天數: {selectMonthData.personal_leave}</p>
                    </div>
                    
                    <div className="otherInfo">
                      <p>其他假別日期: {selectMonthData.other_leave_date}</p>
                      <p>其他假別天數:{selectMonthData.other_leave}</p>
                    </div>
                  </div>
                </div>
                
                <div className="paymentInfo">
                  <p>總計: {selectMonthData.total_salary}</p>
                  <p>簽收: {selectMonthData.check_in_salary}</p>
                </div>
            </div>
          )
        })
    }
    </div>
  )
}

export default App
