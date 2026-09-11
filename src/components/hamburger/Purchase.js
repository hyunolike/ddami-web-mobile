import React, {useState} from 'react';
import styled from "styled-components";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import PriceComponents from "./PriceComponents";
import PriceTagFilter from "./PriceTagFilter";

const Body = styled.div`
  width: 100%;
  height: 100%;
  background: #F0F0F6;
`;

const LikeTitle = styled.div`
  padding-top: 16px;
  padding-bottom: 15px;
  font-size: 18px;
  text-align: center;
  width: 100%; 
  height: 51px;
  background: #F0F0F6;
`;

const LikeSection = styled.div`
  background: #ffffff;
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  padding-top: 20px;
  padding-left: 16px;
`;

const EmptyMessage = styled.div`
  padding: 40px 0 60px;
  font-size: 14px;
  color: #808080;
  text-align: center;
`;

const TAGS = ['전체', '거래 중', '거래 완료', '거래 중단'];

const IMG = 'http://222.251.129.150/uploads/material.jpg';

const SELL_LIST = [
    {id: 1, title: '푸른 호수의 아침', universityName: '홍익대학교', time: '3개월 전', price: 50000, status: 'trading'},
    {id: 2, title: '여름 정물 드로잉', universityName: '국민대학교', time: '5개월 전', price: 32000, status: 'complete'},
    {id: 3, title: '캔버스 위의 도시', universityName: '서울대학교', time: '7개월 전', price: 78000, status: 'stop'},
];

const BUY_LIST = [
    {id: 4, title: '수채 스케치북', universityName: '홍익대학교', time: '1개월 전', price: 26000, status: 'complete'},
    {id: 5, title: '아크릴 물감 세트', universityName: '국민대학교', time: '2개월 전', price: 29500, status: 'trading'},
];

const STATUS_TEXT = {trading: '거래 중', complete: '거래 완료', stop: '거래 중단'};

const { TabPane } = Tabs;

const PriceList = (props) => {
    const {items} = props;
    const [tag, setTag] = useState(TAGS[0]);
    const filtered = tag === TAGS[0]
        ? items
        : items.filter((item) => STATUS_TEXT[item.status] === tag);

    return (
        <>
            <PriceTagFilter tags={TAGS} selected={tag} onSelect={setTag}/>
            {filtered.length === 0
                ? <EmptyMessage>{tag}인 내역이 없습니다.</EmptyMessage>
                : filtered.map((item) => (
                    <PriceComponents key={item.id} fileUrl={IMG} {...item}/>
                ))}
        </>
    );
};

const Purchase = () => {
    return (
        <Body>
            <LikeTitle>판구매 조회</LikeTitle>
            <LikeSection>
                <Tabs>
                    <TabPane tab="판매 내역" key="1">
                        <PriceList items={SELL_LIST}/>
                    </TabPane>
                    <TabPane tab="구매 내역" key="2">
                        <PriceList items={BUY_LIST}/>
                    </TabPane>
                </Tabs>
            </LikeSection>
        </Body>
    );
};

export default Purchase;
