import React from "react";
import {SectionColumns, SectionTitle} from "datawheel-canon";

import { Treemap } from "d3plus-react";
import mondrianClient, { geoCut } from 'helpers/MondrianClient';

import { ordinalColorScale } from 'helpers/colors';
import { getGeoObject } from 'helpers/dataUtils';
import {translate} from "react-i18next";

export default translate()(class ExportsByProduct extends SectionColumns {

    static need = [
        (params,store) => {

            const geo = getGeoObject(params)
            
            const prm = mondrianClient
                .cube('exports')
                .then(cube => {
                    var q = geoCut(geo,
                                   'Geography',
                                   cube.query
                                       .option('parents', true)
                                       .drilldown('Export HS', 'HS2')
                                       .drilldown('Date', 'Year')
                                       .measure('FOB US'),
                                    store.i18n.locale);

                    return { key: 'path_exports_by_product', data: 'http://localhost:9292'+q.path('jsonrecords') };
                });

            return {
                type: "GET_DATA",
                promise: prm
            };
        }
    ];

    render() {
        const {t} = this.props;
        const path = this.context.data.path_exports_by_product;

        return (
            <SectionColumns>
                <SectionTitle>{ t('Exports By Product') }</SectionTitle>
                <article>Aliquam erat volutpat.  Nunc eleifend leo vitae magna.  In id erat non orci commodo lobortis.  Proin neque massa, cursus ut, gravida ut, lobortis eget, lacus.  Sed diam.  Praesent fermentum tempor tellus.  Nullam tempus.  Mauris ac felis vel velit tristique imperdiet.  Donec at pede.  Etiam vel neque nec dui dignissim bibendum.  Vivamus id enim.  Phasellus neque orci, porta a, aliquet quis, semper a, massa.  Phasellus purus.  Pellentesque tristique imperdiet tortor.  Nam euismod tellus id erat.</article>
                <Treemap config={{
                    height: 552,
                    data: path,
                    groupBy: ["ID HS0", "ID HS2"],
                    label: d => d["HS2"] instanceof Array ? d["HS0"] : d["HS2"],
                    sum: d => d["FOB US"],
                    time: 'ID Year',
                    shapeConfig: {
                        fill: d => ordinalColorScale(d['ID HS0'])
                    }
                }}
                dataFormat={ (data) => data.data } />

            </SectionColumns>
        );
    }
})
