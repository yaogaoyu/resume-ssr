/**
 * 个人简介
 */

import React from 'react';
import ApiClient from '../../core/api/ApiClient';

export default class Description extends React.Component {
    static loadData = async (store) => {
        const result = await ApiClient.get('api test1');
        store.dispatch({
            type: 'init-data',
        }, result.data);
        return result;
    };

    render() {
        return (
            <div className="description">
                <div className="header">
                    <div className="headerWrap">
                        <image src="/static/img/favorite.png" />
                    </div>
                </div>
                <div className="details">
                    <div>姚先生</div>
                    <div>222</div>
                    <div>333</div>
                    <div>444</div>
                </div>
            </div>
        );
    }
}
