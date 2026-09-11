import React from 'react';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

// 검색/회원가입 화면과 같이 상단 고정 바로 전역 헤더를 덮는다.
const WriteTop = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  background-color: #FFFFFF;
  button {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
`

const BackButton = styled.button`
  width: 40px;
  font-size: 22px;
  color: #232323;
`

const TemporarySave = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 14px;
`

const TempContent = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #BBBBBB;
  border-radius: 14px;
  padding: 5px 14px;
  font-size: 13px;
  color: #4D4D4D;
  white-space: nowrap;
  span {
    margin-left: 6px;
    color: #322FA0;
    font-weight: bold;
  }
`

const RegisterButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: #322FA0;
`

export default () => {
  const history = useHistory()
  return(
    <WriteTop>
      <BackButton onClick={() => history.goBack()} className='back'>X</BackButton>
      <TemporarySave>
        <TempContent>
          임시저장<span>3</span>
        </TempContent>
      </TemporarySave>
      <RegisterButton className='register'>등록</RegisterButton>
    </WriteTop>
  )
}
