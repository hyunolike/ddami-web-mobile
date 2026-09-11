import React from "react";
import { Route, Switch } from "react-router-dom";
import WorkPlace from "../components/workplace/Workplace";
import Write from '../components/workplace/Write';
import WorkDetail from "../components/workplace/work/WorkDetail";

const WorkplacePage = (props) => {
  // /workplace/write 는 /workplace/:ArtistId 패턴에도 걸리기 때문에
  // Switch 로 감싸 먼저 선언된 라우트 하나만 렌더링되도록 한다.
  return(
    <Switch>
      <Route exact path='/workplace/write' component={Write}/>
      <Route exact path='/workplace/work/:workId' component={WorkDetail}/>
      <Route exact path='/workplace/material/:materialId' component={WorkDetail}/>
      <Route exact path='/workplace/:ArtistId' component={WorkPlace}/>
    </Switch>
  )
}

export default WorkplacePage
