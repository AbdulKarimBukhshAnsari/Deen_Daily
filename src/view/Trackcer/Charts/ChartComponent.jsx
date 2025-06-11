import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { formatDate } from '../../../utils/dateUtils';

const ChartComponent = ({ data, chartTitle, axisValue, mainColor, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getLast7Days = (currentDate) => {
    if (!currentDate) {
      currentDate = formatDate(new Date());
    }
    const [year, month, day] = currentDate.split('-').map(Number);
    const endDate = new Date(year, month - 1, day);

    const days = [];
    const dayNames = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(endDate.getDate() - i);
      const formattedDate = formatDate(d);
      days.push(formattedDate);
      dayNames.push(getDayName(formattedDate));
    }
    return { dates: days, dayNames };
  };

  useEffect(() => {
    // Initialize chart
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
    }

    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    // Observe the chart container
    resizeObserver.observe(chartRef.current);

    const { dates, dayNames } = getLast7Days(data.currentDate);
    const chartData = dates.map(date => data.history[date] || 0);

    const option = {
      title: {
        text: chartTitle,
        left: 'center',
        textStyle: { 
          color: mainColor,
          fontSize: '14px',
          fontWeight: 'bold'
        },
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const [item] = params;
          const dateIndex = dayNames.indexOf(item.axisValue);
          const fullDate = dates[dateIndex];
          return `${item.axisValue} (${fullDate})<br/>${axisValue}: ${item.data}${type === 'Namaz' ? '/5' : ' pages'}`;
        }
      },
      grid: {
        top: '20%',
        left: '8%',
        right: '8%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dayNames, // Using day names instead of dates
        axisLabel: { 
          color: mainColor,
          rotate: 0,
          fontSize: '12px',
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        max: type === 'Namaz' ? 5 : 30,
        axisLabel: { 
          color: mainColor,
          fontSize: '11px',
          margin : 30
        },
        name: axisValue,
        nameTextStyle: {
          color: mainColor,
          fontSize: '12px',
          padding: [0, 0, 5, 0]
        }
      },
      series: [{
        data: chartData,
        type: 'bar',
        itemStyle: {
          color: mainColor,
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '40%',
        emphasis: {
          itemStyle: {
            color: mainColor,
            brightness: 0.8
          }
        }
      }]
    };

    chartInstance.current.setOption(option);

    // Clean up
    return () => {
      resizeObserver.disconnect();
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [data, chartTitle, axisValue, mainColor, type]);

  return (
    <div className="w-full h-full min-h-[300px]" ref={chartRef} />
  );
};

export default ChartComponent;
