import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import WriteTopBar from "./WriteTopBar";
import Configure from "./Configure";
import WriteBar from "./WriteBar";
import {setFooterVisible} from "../../store/actions";

const Line = styled.hr`
  color: #E4E4E4;
  size: 1px;
  margin: 0;
`

const InputBody = styled.div`
  border-top-left-radius: 50px;
  padding-top: 10px;
  width : 100%;
  input, textarea {
    outline: none;
    width : 90%;
    display: block;
    border: none;
    margin: 0 auto;
    padding: 14px 0;
    font-family: inherit;
    font-size: 15px;
    color: #3C3C3C;
    resize: none;
  }
`

const TitleInput = styled.input`
  &::placeholder {
    font-weight: 700;
  }
`

const ContentInput = styled.textarea`
  height: 40vh;
`

// 상단 고정 바는 전역 헤더(60px)가 차지한 자리를 그대로 덮으므로 별도 여백이 없고,
// 하단 고정 바(60px)에 내용이 가리지 않도록 아래쪽 여백만 준다.
const Write = styled.div`
  padding-bottom: 60px;
  background-color: #FFFFFF;
`

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFooterVisible(false))
    return () => dispatch(setFooterVisible(true))
  }, [dispatch])

  return(
    <Write>
      <WriteTopBar/>
      <InputBody>
        <TitleInput placeholder='제목을 입력해주세요'/>
        <Line />
        <ContentInput placeholder='글을 입력해주세요'/>
      </InputBody>
      <Line />
      <Configure/>
      <WriteBar/>
    </Write>
  )
}
