import * as service_urls from './urls.js';
import * as common from "./common.js";



let cookie = common.getKBaseCookie();



var jobstatus = {
	1: 'Idle',
	2: 'Running',
	3: 'Removed',
	4: 'Completed',
	5: 'Held'
};

function button(i) {
	var html =
		'<button class="btn btn-primary"' +
		'type="button" data-toggle="collapse" data-target="#' +
		i +
		'" aria-expanded="false" aria-controls="collapseExample">' +
		'Button with data-target  </button>';
	return html;
}

function body() { }

function createMiniTable(classad, i) {
	var html = button(i);

	html += '<div id="' + i + '" class="collapse">';

	html += '<table><tbody>';

	html += button(i);

	html += 'abc';
	// for (var item in classad) {
	// html += '<tr><td>' + item + '</td><td>' + classad[item] + '</td></tr>';
	// }
	html += '</tbody></table>';

	html += '</div>';
	return html;
}



$(document).ready(function () {
	fillTable();
});
//fetch api (AJAX) to fill table  curl -d '{"method": "NarrativeJobService.status", "version": "1.1", "id": 1, "params": []}'
let fillTable = (authCookie) => {
	fetch(service_urls.condor_url, {
		method: 'GET',
		headers: {
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json',
			Authorization: common.getKBaseCookie()

		}
		// mode: 'no-cors',
		// body: JSON.stringify({
		//     "method": "execution_engine2.check_jobs_date_range_for_all",
		//     "version": "1.1", "id": 1,
		//     "params": [{
		//         'start_time': "0",
		//         'end_time': "Tue, 21 Apr 2020 15:33:03 GMT",
		//         'ascending': 0
		//     }]
		// })
	})
		.then((response) => response.json())
		.then((data) => {
			data.sort((a, b) => (a['jobid'] < b['jobid'] ? 1 : -1));
			let jobs = data;
			console.log(jobs);

			let html = '';
			for (let i = 0; i < jobs.length; i++) {
				let classad = jobs[i]['classad'];
				html += '<tr>';

				html += '<td >' + classad['accountinggroup'] + '</td>';
				html += '<td >' + classad['jobbatchname'] + '</td>';
				html += '<td >' + classad['clusterid'] + '</td>';
				let status = jobstatus[classad['jobstatus']];

				html += '<td >' + classad['jobstatus'] + '</td>';
				html += '<td >' + status + '</td>';
				html += '<td >' + classad['holdreason'] + '</td>';
				html += '<td >';
				html += createMiniTable(classad, i);
				html += '</tr>';
			}

			$('#condor_table tbody').html(html);
		})
		.then((nothing) => {
			let table = $('#condor_table').DataTable({
				order: [[2, 'desc']],
				orderCellsTop: true,
				fixedHeader: true,
				bLengthChange: false,
				pageLength: 1000
			});

			// // Setup - add a text input to each footer cell
			// $('#condor_table thead tr').clone(true).appendTo('#condor_table thead');
			// $('#condor_table thead tr:eq(1) th').each(function (i) {
			// 	var title = $(this).text();
			// 	$(this).html('<input type="text" placeholder="Search ' + title + '" />');

			// 	$('input', this).on('keyup change', function () {
			// 		if (table.column(i).search() !== this.value) {
			// 			table.column(i).search(this.value).draw();
			// 		}
			// 	});
			// 	$('input', this).on('onclick', function () { });
			// });
		})
		.catch((err) => console.log('ERROR!: ', err));
};
