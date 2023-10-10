import React, { useRef, useEffect} from 'react';
import * as d3 from 'd3';

const UniquenessHistogram = (props) => {
  const svgRef = useRef(null);

  const { group } = props;
  useEffect(() => {
     // Clear the SVG
     d3.select(svgRef.current).selectAll("*").remove();
    // Extracting x-axis labels and y-axis values from inter_hamming_distances
    const xLabels = group.inter_hamming_distances.map(obj => `${obj.chip1}_${obj.iterationChip1}-${obj.chip2}_${obj.iterationChip2}`);
    const yValues = group.inter_hamming_distances.map(obj => obj.hammingDistance);

    const yBuffer = 0.0;  // Adjust this value as needed

     // Find the minimum and maximum values in the dataset
     const yMin = d3.min(yValues) - yBuffer;
    const yMax = d3.max(yValues) + yBuffer;
    console.log(yMin, yMax)


    // Set dimensions
    const width = 800;
    const height = 600;
    const margin = { top: 40, right: 20, bottom: 50, left: 50 };

    // Create scales
    const xScale = d3.scaleBand()
        .domain(xLabels)
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .nice()
        .range([height - margin.bottom, margin.top]);

    // Create SVG canvas
    const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

    // Draw bars
    svg.selectAll('rect')
        .data(yValues)
        .join('rect')
        .attr('x', (d, i) => xScale(xLabels[i]))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(0) - yScale(d))
        .attr('fill', 'steelblue');

    // Draw axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
    
      const title = "Hamming Distances Histogram";
      svg.append("text")
          .attr("x", width / 2)
          .attr("y", margin.top)
          .attr("text-anchor", "middle")
          .attr("font-size", "24px")
          .attr("font-weight", "bold")
          .text(title);

}, [group]);

const downloadChart = () => {
  const svgElement = svgRef.current;
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgElement);

  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(source);

  img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      const pngImg = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImg;
      downloadLink.download = "chart.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  };
};

  return (
    <>
    <svg ref={svgRef}></svg>
      <button onClick={downloadChart}>Download Chart</button>
      </>

  );
};

export default UniquenessHistogram;
