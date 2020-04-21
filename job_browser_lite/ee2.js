$(document).ready(function () {
    fillTable();
})
//fetch api (AJAX) to fill table  curl -d '{"method": "NarrativeJobService.status", "version": "1.1", "id": 1, "params": []}'
fillTable = () => {
    fetch('https://ci.kbase.us/services/ee2', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'XXXXX'
        },
        // mode: 'no-cors',
        body: JSON.stringify({
            "method": "execution_engine2.check_jobs_date_range_for_all",
            "version": "1.1", "id": 1,
            "params": [{
                'start_time': "0",
                'end_time': "Tue, 21 Apr 2020 15:33:03 GMT",
                'ascending': 0
            }]
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let jobs = data.result[0].jobs;
            let html = '';
            for (i = 0; i < jobs.length; i++) {
                html += '<tr>' +
                    '<td class="tdUsername pv3 w-35 pr3 bb b--black-20">' + jobs[i]['user'] + '</td>' +
                    '<td class="tdPassword pv3 w-35 pr3 bb b--black-20">' + jobs[i]['job_id'] + '</td>' +
                    '<td class="tdPassword pv3 w-35 pr3 bb b--black-20">' + jobs[i]['status'] + '</td>' +
                    '<td class="tdPassword pv3 w-35 pr3 bb b--black-20">' + jobs[i]['job_input']['app_id'] + '</td>' +
                    '<td class="tdPassword pv3 w-35 pr3 bb b--black-20">' + jobs[i]['job_input']['method'] + '</td>' +
                    '<td class="tdPassword pv3 w-35 pr3 bb b--black-20">' + JSON.stringify(jobs[i]['condor_job_ads']) + '</td>' +
                    '</tr>'
            }
            console.log("html is", html);
            $('#example_body').html(html);
        })
        .then(nothing => {
            // Setup - add a text input to each footer cell
            $('#example thead tr').clone(true).appendTo('#example thead');
            $('#example thead tr:eq(1) th').each(function (i) {
                var title = $(this).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');

                $('input', this).on('keyup change', function () {
                    if (table.column(i).search() !== this.value) {
                        table
                            .column(i)
                            .search(this.value)
                            .draw();
                    }
                });
            });
            $('#example').DataTable({
                orderCellsTop: true,
                fixedHeader: true
            });

        })

        .catch(err => console.log("ERROR!: ", err))
}