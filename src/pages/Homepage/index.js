import React from "react"
import { Button, Pagination, Table } from "antd"
import { FaFileDownload, FaPrint } from "react-icons/fa"
import { write, utils } from "xlsx"
import { connect } from "react-redux"
import FileSaver from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import dummyService from "service/dummyService"
import { getDummyData } from "store/actions/authAction"
import { useNavigate } from "react-router-dom"
import "./styles.scss"

const Homepage = ({ tableData, tableCount, getDummyData }) => {
    const [loading, setLoading] = React.useState(true)
    const [count, setCount] = React.useState(1)
    const [downloadBtnLoading, setDownloadBtnLoading] = React.useState(false)
    const [printBtnLoading, setPrintBtnLoading] = React.useState(false)
    const navigate = useNavigate()

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    const fileExtension = ".xlsx"

    React.useEffect(() => {
        getDummyData(count)
        setLoading(false)
    }, [])

    const columns = [
        {
            title: "S.No.",
            dataIndex: "key",
            key: "key",
        },
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
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => navigate(`/user?firstname=${record.firstname}&age=${record.age}`)}
                >
                    View Details
                </Button>
            ),
        },
    ]

    const tableAsPdf = async () => {
        setPrintBtnLoading(true)
        const doc = new jsPDF()
        const alldata = await dummyService.getAllData()
        console.log("alldata", alldata)
        autoTable(doc, {
            head: [["Index", "First Name", "Last Name", "Age", "Gender"]],
            body: alldata.map((ele) => [ele.key, ele.firstname, ele.lastname, ele.age, ele.gender]),
        })
        doc.save("table.pdf")
        setPrintBtnLoading(false)
    }

    const exportToCSV = async () => {
        setDownloadBtnLoading(true)
        const fileName = "Exported Data"
        let alldata = await dummyService.getAllData()
        alldata = alldata.map((ele, index) => {
            delete ele.key
            return { index: index + 1, ...ele }
        })
        const ws = utils.json_to_sheet(alldata)
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
        const excelBuffer = write(wb, { bookType: "xlsx", type: "array" })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
        setDownloadBtnLoading(false)
    }
    return (
        <div className="homepage-conatiner">
            <div className="conatiner">
                <div className="content">
                    <div className="download-data">
                        <Button
                            type="primary"
                            size="large"
                            className="btn"
                            onClick={exportToCSV}
                            disabled={!tableData.length}
                            loading={downloadBtnLoading}
                        >
                            <FaFileDownload />
                            Downlaod
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            className="btn"
                            onClick={tableAsPdf}
                            disabled={!tableData.length}
                            loading={printBtnLoading}
                        >
                            <FaPrint />
                            Print
                        </Button>
                    </div>
                    <Table loading={loading} pagination={false} columns={columns} dataSource={tableData} />
                    <Pagination onChange={(count) => getDummyData(count)} defaultCurrent={count} total={tableCount} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tableData: state.data.tableData,
        tableCount: state.data.tableCount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDummyData: (props) => dispatch(getDummyData(props)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
