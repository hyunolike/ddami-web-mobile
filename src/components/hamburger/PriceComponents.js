import React from 'react';
import styled from "styled-components";
import DotIcon from '../../static/icons/dot_menu.svg'

const SubscribeSection = styled.div`
  display: flex;
  width: 100%;
  height: 114px;
  margin-bottom: 36px;
`;

const SubImg = styled.img`
  width: 114px;
  height: 114px;
  border-radius: 4px;
  object-fit: cover;
  background: #E9E9F2;
`;

const SubSection = styled.div`
  margin-left: 14px;
  width: 214px;
  height: 100%;
`;

const SubTitle = styled.div`
  height: 20px;
  width: 100%;
`;

const WorkTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  color: #232323;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #232323;
`;

const DotImg = styled.img`
  height: 22.62px;
`;

const UniversityName = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color:#808080;
`;

const Time = styled.div`
  font-size: 11px;
  color: #BBBBBB;
`;

const DealSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 23px; //디자인이 맞지가 않아 조정하였습니다.
  height: 100%;
  width: 100%;
`;

const Price = styled.div`
  margin-left: 7px;
  font-size: 17px;
  font-weight: bold;
  color: #232323;
  height: 100%;
`;

//여기서부터는 거래 중, 거래 완료, 거래 대기 관련 컴포넌트스타일 3가지 입니다.
const Trading = styled.div`
  padding-top: 1px;
  height: 22px;
  width: 50px;
  color:#F7606B;
  border: #F7606B solid 1px;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
`;

const TradingComplete = styled.div`
  padding-top: 2px;
  height: 22px;
  width:61px;
  border-radius: 3px;
  background-color: #BBBBBB;
  font-size: 12px;
  text-align: center;
  color: #FFFFFF;
`;

const TradingStop = styled.div`
  padding-top: 2px;
  height: 22px;
  width:61px;
  border-radius: 3px;
  background-color: #F7606B;
  font-size: 12px;
  text-align: center;
  color: #FFFFFF;
`;

// 거래 상태값 -> 배지 컴포넌트/문구
const DEAL_STATUS = {
    trading: [Trading, '거래 중'],
    complete: [TradingComplete, '거래 완료'],
    stop: [TradingStop, '거래 중단'],
};

const PriceComponents = (props) => {
    const {fileUrl, title, universityName, time, price, status = 'trading'} = props;
    const [DealBadge, dealText] = DEAL_STATUS[status] || DEAL_STATUS.trading;

    return (
        <SubscribeSection>
            <SubImg src={fileUrl} alt={title}/>
            <SubSection>
                <SubTitle>
                    <WorkTitle>
                        <Title>{title}</Title>
                        <DotImg src={DotIcon} alt="메뉴아이콘"/>
                    </WorkTitle>
                    <UniversityName>{universityName}</UniversityName>
                    <Time>{time}</Time>
                    <DealSection>
                        <DealBadge>{dealText}</DealBadge>
                        <Price>{price.toLocaleString()}원</Price>
                    </DealSection>
                </SubTitle>
            </SubSection>
        </SubscribeSection>
    );
};

export default PriceComponents;
