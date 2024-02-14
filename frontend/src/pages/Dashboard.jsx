import { useState } from "react"
import Appbar from "../components/Appbar"
import CardContainer from "../components/CardContainer"


export const Dashboard = () => {
  return <div className="bg-slate-300">
    <Appbar />
    <div className="m-8">
      <CardContainer />
    </div>
  </div>
}