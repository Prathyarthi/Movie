import Appbar from "../components/Appbar"
import CardContainer from "../components/CardContainer"
import AdminCardContainer from "../components/AdminCardContainer"

const role = localStorage.getItem("role")
export const Dashboard = () => {
  return <div className="bg-slate-900">
    <Appbar />
    <div className="">
      {role === 'admin' ? <AdminCardContainer /> :
        <CardContainer />
      }
    </div>
  </div>
}