import { useState } from "react"
import Appbar from "../components/Appbar"
import CardContainer from "../components/CardContainer"


export const Dashboard = () => {
  return <div className="bg-slate-900">
    <Appbar />
    <div className="">
      <CardContainer />
    </div>
  </div>
}