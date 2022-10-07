import React from "react"
import { Button, Table } from "antd"
import { connect } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { MdArrowBackIosNew } from "react-icons/md"
import dummyService from "service/dummyService"
import qs from "qs"
import "./styles.scss"

const column1 = [
    {
        title: "First Name",
        dataIndex: "firstname",
        key: "firstname",
    },
    {
        title: "Last Name",
        dataIndex: "lastname",
        key: "lastname",
    },
    {
        title: "Age",
        key: "age",
        dataIndex: "age",
    },
]

const column2 = [
    {
        title: "Father Name",
        dataIndex: "fathername",
        key: "fathername",
    },
    {
        title: "Mother Name",
        dataIndex: "mothername",
        key: "mothername",
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
]

const User = ({ tableData }) => {
    const [loadingColumn1Data, setLoadingColumn1Data] = React.useState(true)
    const [loadingColumn2Data, setLoadingColumn2Data] = React.useState(true)
    const [userData, setUserData] = React.useState({})
    const [userCloumn2Data, setUserColumn2Data] = React.useState([])
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        const { search } = location
        const { firstname, age } = qs.parse(search, { ignoreQueryPrefix: true })
        const fetchData = async (user) => {
            const data = await dummyService.getUserData(user)
            if (data) {
                setUserColumn2Data(data)
                setLoadingColumn2Data(false)
            }
        }
        if (firstname && age) {
            const userData = tableData.find((user) => user.firstname === firstname && user.age.toString() === age)
            if (userData) {
                setUserData(userData)
                setLoadingColumn1Data(false)
                fetchData({ firstname, age })
            } else navigate("/")
        } else navigate("/")
    }, [])

    return (
        <div className="homepage-conatiner">
            <div className="conatiner">
                <div className="content">
                    <div className="navigate-back">
                        <Button type="primary" className="btn" size="large" onClick={() => navigate("/")}>
                            <MdArrowBackIosNew /> Back
                        </Button>
                    </div>
                    <Table loading={loadingColumn1Data} columns={column1} dataSource={[userData]} />
                    <Table loading={loadingColumn2Data} columns={column2} dataSource={userCloumn2Data} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tableData: state.data.tableData,
    }
}

export default connect(mapStateToProps, {})(User)
