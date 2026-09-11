import React from 'react';
import styled from "styled-components";

// 따미샵 필터(FilterList)와 같은 칩 스타일을 사용한다.
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Tag = styled.div`
  margin: 0 8px 8px 0;
  border-radius: 14px;
  border: 1px solid #322FA0;
  background-color: ${(props) => (props.selected ? '#322FA0' : 'transparent')};
  cursor: pointer;
`;

const TagText = styled.p`
  font-size: 13px;
  color: ${(props) => (props.selected ? '#FFFFFF' : '#322FA0')};
  padding: 7px 14px;
  margin: 0;
`;

const PriceTagFilter = (props) => {
    const {tags, selected, onSelect} = props;
    return (
        <TagWrapper>
            {tags.map((tag) => (
                <Tag key={tag} selected={selected === tag} onClick={() => onSelect(tag)}>
                    <TagText selected={selected === tag}>{tag}</TagText>
                </Tag>
            ))}
        </TagWrapper>
    );
};

export default PriceTagFilter;
