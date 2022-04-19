import React, { memo, useState, useCallback, useEffect } from 'react'
import Api from '../../api'
import Board from '../components/Board'
import Panel from '../components/Panel'
import { ContainerStyle } from './style'
import { Chart } from "react-google-charts";
import _ from 'lodash';

function Main(){

    const [data, setDate] = useState({})
    const [country , setCountry] = useState('brazil')
    const updateAt = new Date().toLocaleString()

    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
            .then(data => setDate(data))
    }, [])

    useEffect(() => {
        getCovidData(country)
    }, [getCovidData, country])

    const handleChange = ({ target }) => {
        const country = target.value
        setCountry(country)
    }

    const data1 = [
        ["cases", "Hours per Day"],
        ["Casos de Hoje", 20],
        ["Mortes", 2],
        ["Casos", 30],
      ];

      const options = {
        title: "COVID-19",
        is3D: true,
      };

    return(
        <ContainerStyle>
        <div className="mb-2">
            <Panel
            data={data}
            updateAt={updateAt}
            onChange={handleChange}
            country={country}
            getCovidData={getCovidData}
            />
        </div>
        <Board data={data}/>
        <br></br>
        <Chart
            chartType="PieChart"
            data={data1}
            options={options}
            width={"100%"}
            height={"400px"}
        />
        </ContainerStyle>
    )
}

export default memo(Main)