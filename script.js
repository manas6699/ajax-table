 
        $(document).ready(function () {
            // Initialize DataTables with AJAX
            var table = $('#transactionTable').DataTable({
                "ajax": {
                    "url": "https://big9.fynbnk.com/ajax_test", // Replace with your API endpoint
                    "type": "POST",
                    "dataSrc": ""
                },
                "columns": [
                    { "data": "txnDate" },
                    { "data": "txnID" },
                    { "data": "intID" },
                    { "data": "orderID" },
                    { "data": "txnAmount" },
                    { "data": "rmn" },
                    { "data": "txnStatus" },
                    { "data": "mode" },
                    { "data": "gateway" },
                    { "data": "settlementStatus" }
                ],
                "paging": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "lengthMenu": [2, 3, 5]
            });

            // Filter by Transaction Status
            $('#statusFilter').on('change', function () {
                var selectedStatus = $(this).val();
                table.column(6).search(selectedStatus).draw();
            });

            // filter by gateway
            $('#gatewayFilter').on('change', function () {
                var selectedGateway = $(this).val();
                table.column(8).search(selectedGateway).draw();
            });

            // filter by settlement status
            $('#settlementFilter').on('change', function () {
                var selectedSettlement = $(this).val();
                table.column(9).search(selectedSettlement).draw();
            });

            // Custom date range filter
            $.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
                    var min = $('#minDate').val();
                    var max = $('#maxDate').val();
                    var txnDate = data[0]; // Use data for the transaction date column

                    if (
                        (min === "" && max === "") ||
                        (min === "" && txnDate <= max) ||
                        (min <= txnDate && max === "") ||
                        (min <= txnDate && txnDate <= max)
                    ) {
                        return true;
                    }
                    return false;
                }
            );

            // Apply filter on button click
            $('#applyDateFilter').on('click', function () {
                $('#transactionTable').DataTable().draw();
            });

            // Event listener for the two date inputs
            // $('#minDate, #maxDate').on('change', function () {
            //     table.draw();
            // });

           

            // Download Excel
            $('#downloadExcel').on('click', function () {
                var wb = XLSX.utils.table_to_book(document.getElementById('transactionTable'), { sheet: "Sheet1" });
                XLSX.writeFile(wb, "transaction_table.xlsx");
            });
        });
