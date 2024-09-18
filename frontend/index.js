import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addTaxPayerForm');
    const searchForm = document.getElementById('searchTaxPayerForm');
    const searchResult = document.getElementById('searchResult');
    const taxPayerList = document.getElementById('taxPayerList');

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taxpayer = {
            tid: document.getElementById('tid').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value
        };
        await backend.addTaxPayer(taxpayer);
        addForm.reset();
        await updateTaxPayerList();
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(tid);
        if (result.length > 0) {
            const taxpayer = result[0];
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p>TID: ${taxpayer.tid}</p>
                <p>Name: ${taxpayer.firstName} ${taxpayer.lastName}</p>
                <p>Address: ${taxpayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with that TID.</p>';
        }
    });

    async function updateTaxPayerList() {
        const taxpayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = taxpayers.map(tp => `
            <div class="taxpayer-item">
                <p>TID: ${tp.tid}</p>
                <p>Name: ${tp.firstName} ${tp.lastName}</p>
                <p>Address: ${tp.address}</p>
            </div>
        `).join('');
    }

    await updateTaxPayerList();
});
