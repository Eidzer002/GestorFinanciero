// --- CONSTANTS ---
    const APP_VERSION = 'v4.0'; // App version for LS keys
    const LS_KEYS = {
        TRANSACTIONS: `transaccionesPro${APP_VERSION}`,
        CATEGORIES: `categoriasPro${APP_VERSION}`,
        DEBTS: `deudasPro${APP_VERSION}`,
        SAVINGS_ACCOUNTS: `savingsAccountsPro${APP_VERSION}`,
        SALARY_ALLOCATION_RULE: `salaryAllocationRulePro${APP_VERSION}`,
        DISPLAY_CURRENCY: `displayCurrencyPro${APP_VERSION}`
    };
    const DEFAULT_CURRENCY = 'CUP';
    const SALARY_CATEGORY_NAME = "Salario";
    const LARGE_TRANSACTION_THRESHOLD = 5000;
    const DEFAULT_SAVINGS_ICON = 'fas fa-piggy-bank';
    const DEFAULT_CATEGORY_ICON = 'fas fa-tag';

    // --- PREDEFINED ICONS (Font Awesome) ---
    const PREDEFINED_ICONS = [
        { name: 'Salario', value: 'fas fa-money-bill-wave', color: '#10B981' }, { name: 'Comida', value: 'fas fa-utensils', color: '#FF6384' },
        { name: 'Supermercado', value: 'fas fa-shopping-cart', color: '#FF9F40' }, { name: 'Transporte', value: 'fas fa-bus-alt', color: '#36A2EB' },
        { name: 'Coche', value: 'fas fa-car', color: '#4CAF50' }, { name: 'Hogar', value: 'fas fa-home', color: '#FFCE56' },
        { name: 'Salud', value: 'fas fa-heartbeat', color: '#4BC0C0' }, { name: 'Cuidado Personal', value: 'fas fa-spa', color: '#BA68C8' },
        { name: 'Ropa', value: 'fas fa-tshirt', color: '#F06292' }, { name: 'Ocio', value: 'fas fa-film', color: '#9575CD' },
        { name: 'Suscripciones', value: 'fas fa-rss-square', color: '#78909C' }, { name: 'Educación', value: 'fas fa-graduation-cap', color: '#A1887F' },
        { name: 'Regalos', value: 'fas fa-gift', color: '#FF8A65' }, { name: 'Mascotas', value: 'fas fa-paw', color: '#90A4AE' },
        { name: 'Viajes', value: 'fas fa-plane-departure', color: '#4DD0E1' }, { name: 'Deportes', value: 'fas fa-dumbbell', color: '#AED581' },
        { name: 'Ahorros (Aportes)', value: 'fas fa-piggy-bank', color: '#66BB6A' }, { name: 'Deudas (Pagos)', value: 'fas fa-file-invoice-dollar', color: '#7E57C2' },
        { name: 'Impuestos', value: 'fas fa-landmark', color: '#FFB74D' }, { name: 'Otros Gastos', value: 'fas fa-ellipsis-h', color: '#BDBDBD' },
        { name: 'Banco', value: 'fas fa-university', color: '#546E7A' }, { name: 'Monedas', value: 'fas fa-coins', color: '#FFCA28' },
        { name: 'Billetera', value: 'fas fa-wallet', color: '#78716C' }, { name: 'Gráfico', value: 'fas fa-chart-line', color: '#26A69A' },
        { name: 'Donar', value: 'fas fa-donate', color: '#EC407A' }, { name: 'Semilla', value: 'fas fa-seedling', color: '#8BC34A' },
        { name: 'Idea', value: 'fas fa-lightbulb', color: '#FFEB3B' }, { name: 'Maletín', value: 'fas fa-briefcase', color: '#A1887F' },
        { name: 'Herramientas', value: 'fas fa-tools', color: '#9E9E9E' }, { name: 'Sobre', value: 'fas fa-envelope', color: '#03A9F4'},
        { name: 'Libro', value: 'fas fa-book', color: '#795548'}, { name: 'Construcción', value: 'fas fa-hard-hat', color: '#FF9800'},
        { name: 'Niños', value: 'fas fa-child', color: '#00BCD4'}, { name: 'Gasolina', value: 'fas fa-gas-pump', color: '#F44336'},
        { name: 'Teléfono', value: 'fas fa-phone', color: '#607D8B'}, { name: 'Música', value: 'fas fa-music', color: '#E91E63'},
        { name: 'Juegos', value: 'fas fa-gamepad', color: '#9C27B0'}
    ];

    // --- CURRENCY LIST ---
    const CURRENCIES = [
        { code: 'CUP', name: 'Peso Cubano', symbol: '$MN' }, { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'USD', name: 'US Dollar', symbol: '$' }, { code: 'GBP', name: 'British Pound', symbol: '£' }, { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' }, { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$' }, { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
        { code: 'CNY', name: 'Chinese Yuan Renminbi', symbol: '¥' }, { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' }, { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
        { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }, { code: 'KRW', name: 'South Korean Won', symbol: '₩' }, { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
        { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' }, { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' }, { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }, { code: 'ZAR', name: 'South African Rand', symbol: 'R' }, { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
    ];


    // --- UTILITY FUNCTIONS ---
    const formatCurrency = (amount, currencyCode = null) => {
        const targetCurrencyCode = currencyCode || currentDisplayCurrency;
        const currency = CURRENCIES.find(c => c.code === targetCurrencyCode) || CURRENCIES.find(c => c.code === DEFAULT_CURRENCY);
        try {
            return new Intl.NumberFormat('es-ES', { style: 'currency', currency: currency.code, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
        } catch (e) {
            console.warn(`Error formatting currency for code: ${targetCurrencyCode}. Using default.`, e);
            const defaultCurrInfo = CURRENCIES.find(c => c.code === DEFAULT_CURRENCY);
            return new Intl.NumberFormat('es-ES', { style: 'currency', currency: defaultCurrInfo.code, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
        }
    };

    function showMessage(text, type = 'success', duration = 3000) {
        const container = document.getElementById('message-box-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = `p-4 mb-3 rounded-lg shadow-md text-white ${type === 'success' ? 'bg-green-500' : (type === 'error' ? 'bg-red-500' : 'bg-blue-500')} opacity-0 transition-opacity duration-300`;
        messageDiv.textContent = text;
        container.appendChild(messageDiv);
        requestAnimationFrame(() => messageDiv.style.opacity = '1');
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, duration);
    }

    function generateRandomId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    function populateCurrencySelect(selectElementId, defaultCurrencyCode = DEFAULT_CURRENCY) {
        const selectEl = document.getElementById(selectElementId);
        if (!selectEl) return;
        selectEl.innerHTML = '';
        const sortedCurrencies = [...CURRENCIES].sort((a, b) => a.name.localeCompare(b.name));
        sortedCurrencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency.code;
            option.textContent = `${currency.name} (${currency.symbol})`;
            if (currency.code === defaultCurrencyCode) {
                option.selected = true;
            }
            selectEl.appendChild(option);
        });
    }

    function populateDisplayCurrencySelect() {
        populateCurrencySelect('display-currency-select', currentDisplayCurrency);
    }

    function renderizarIconPicker(containerId, hiddenInputId, selectedIconValue = null) {
        const container = document.getElementById(containerId);
        const hiddenInput = document.getElementById(hiddenInputId);
        if (!container || !hiddenInput) return;

        container.innerHTML = '';
        let hasSelected = false;

        PREDEFINED_ICONS.forEach(icon => {
            const item = document.createElement('span');
            item.className = 'icon-picker-item focusable';
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', icon.name);
            item.dataset.iconValue = icon.value;
            item.innerHTML = `<i class="${icon.value}" style="color: ${icon.color || 'inherit'};"></i>`;

            if (icon.value === selectedIconValue) {
                item.classList.add('selected');
                hiddenInput.value = icon.value;
                hasSelected = true;
            }

            item.addEventListener('click', () => {
                selectIcon(container, hiddenInput, item, icon.value);
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectIcon(container, hiddenInput, item, icon.value);
                }
            });
            container.appendChild(item);
        });
        if (!hasSelected) {
             hiddenInput.value = '';
        }
    }

    function selectIcon(container, hiddenInput, selectedItem, iconValue) {
        const currentlySelected = container.querySelector('.icon-picker-item.selected');
        if (currentlySelected) {
            currentlySelected.classList.remove('selected');
        }
        selectedItem.classList.add('selected');
        hiddenInput.value = iconValue;
    }


    // --- DOM Elements ---
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const views = {
        dashboard: document.getElementById('view-dashboard'),
        transactions: document.getElementById('view-transactions'),
        savingsAccounts: document.getElementById('view-savings-accounts'),
        categories: document.getElementById('view-categories'),
        debts: document.getElementById('view-debts'),
        salaryAllocation: document.getElementById('view-salary-allocation'),
        reports: document.getElementById('view-reports'),
        dataManagement: document.getElementById('view-data-management'),
        help: document.getElementById('view-help'),
        privacyPolicy: document.getElementById('view-privacy-policy')
    };
    const navLinks = {
        dashboard: document.getElementById('nav-dashboard'),
        transactions: document.getElementById('nav-transactions'),
        savingsAccounts: document.getElementById('nav-savings-accounts'),
        categories: document.getElementById('nav-categories'),
        debts: document.getElementById('nav-debts'),
        salaryAllocation: document.getElementById('nav-salary-allocation'),
        reports: document.getElementById('nav-reports'),
        dataManagement: document.getElementById('nav-data-management'),
        help: document.getElementById('nav-help'),
        privacyPolicy: document.getElementById('nav-privacy-policy')
    };
    const mainHeaderTitle = document.getElementById('main-header-title');
    const displayCurrencySelectEl = document.getElementById('display-currency-select');


    // Transaction Modal Elements (Old/Edit)
    const transactionModal = document.getElementById('transaction-modal');
    const transactionModalTitle = document.getElementById('transaction-modal-title');
    const closeTransactionModalBtn = document.getElementById('close-transaction-modal-btn');
    const cancelTransactionModalBtn = document.getElementById('cancel-transaction-modal-btn');
    const transactionFormModal = document.getElementById('transaction-form-modal');
    const transactionIdEditInput = document.getElementById('transaction-id-edit');
    const tipoTransaccionModalEl = document.getElementById('tipo-transaccion-modal');
    const categoriaTransaccionModalEl = document.getElementById('categoria-transaccion-modal');
    const categoriasDatalistModalEl = document.getElementById('categorias-datalist-modal');
    const montoTransaccionModalEl = document.getElementById('monto-transaccion-modal');
    const monedaTransaccionModalEl = document.getElementById('moneda-transaccion-modal');
    const fechaTransaccionModalEl = document.getElementById('fecha-transaccion-modal');
    const descripcionTransaccionModalEl = document.getElementById('descripcion-transaccion-modal');
    const fuenteIngresoContainerModal = document.getElementById('fuente-ingreso-container-modal');
    const fuenteIngresoSelectModal = document.getElementById('fuente-ingreso-transaccion-modal');
    const metodoPagoContainerModal = document.getElementById('metodo-pago-container-modal');
    const metodoPagoSelectModal = document.getElementById('metodo-pago-transaccion-modal');
    const fuenteCuentaAhorroContainerModal = document.getElementById('fuente-cuenta-ahorro-container-modal');
    const fuenteCuentaAhorroSelectModal = document.getElementById('fuente-cuenta-ahorro-transaccion-modal');

    // New Transaction Wizard Modal Elements
    const fabAddTransactionBtn = document.getElementById('fab-add-transaction');
    const transactionWizardModal = document.getElementById('transaction-wizard-modal');
    const transactionWizardTitle = document.getElementById('transaction-wizard-title');
    const closeTransactionWizardBtn = document.getElementById('close-transaction-wizard-btn');
    const transactionWizardForm = document.getElementById('transaction-wizard-form');
    const wizardStep1 = document.getElementById('wizard-step-1');
    const wizardTypeIngresoBtn = document.getElementById('wizard-type-ingreso');
    const wizardTypeGastoBtn = document.getElementById('wizard-type-gasto');
    const wizardTipoTransaccionInput = document.getElementById('wizard-tipo-transaccion');
    const wizardMethodEfectivoBtn = document.getElementById('wizard-method-efectivo');
    const wizardMethodTarjetaBtn = document.getElementById('wizard-method-tarjeta');
    const wizardMetodoPagoInput = document.getElementById('wizard-metodo-pago');
    const wizardMontoInput = document.getElementById('wizard-monto');
    const wizardMonedaSelect = document.getElementById('wizard-moneda');
    const wizardCancelStep1Btn = document.getElementById('wizard-cancel-step1');
    const wizardNextStep1Btn = document.getElementById('wizard-next-step1');
    const wizardStep2 = document.getElementById('wizard-step-2');
    const wizardGastarDesdeContainer = document.getElementById('wizard-gastar-desde-container');
    const wizardFuenteCuentaAhorroSelect = document.getElementById('wizard-fuente-cuenta-ahorro');
    const wizardCategoriaLabel = document.getElementById('wizard-categoria-label');
    const wizardCategorySelectionGrid = document.getElementById('wizard-category-selection-grid');
    const wizardCategoriaIdInput = document.getElementById('wizard-categoria-id');
    const wizardPrevStep2Btn = document.getElementById('wizard-prev-step2');
    const wizardNextStep2Btn = document.getElementById('wizard-next-step2');
    const wizardCancelStep2Btn = document.getElementById('wizard-cancel-step2');
    const wizardStep3 = document.getElementById('wizard-step-3');
    const wizardFechaInput = document.getElementById('wizard-fecha');
    const wizardDescripcionInput = document.getElementById('wizard-descripcion');
    const wizardPrevStep3Btn = document.getElementById('wizard-prev-step3');
    const wizardSaveTransactionBtn = document.getElementById('wizard-save-transaction');
    const wizardCancelStep3Btn = document.getElementById('wizard-cancel-step3');
    let currentTransactionWizardStep = 1; 
    let wizardTransactionData = {};

    // Savings Account Modal Elements
    const savingsAccountModal = document.getElementById('savings-account-modal');
    const savingsAccountModalTitle = document.getElementById('savings-account-modal-title');
    const closeSavingsAccountModalBtn = document.getElementById('close-savings-account-modal-btn');
    const cancelSavingsAccountModalBtn = document.getElementById('cancel-savings-account-modal-btn');
    const savingsAccountFormModal = document.getElementById('savings-account-form-modal');
    const savingsAccountIdEditInput = document.getElementById('savings-account-id-edit');
    const nombreSavingsAccountModalInput = document.getElementById('nombre-savings-account-modal');
    const objetivoSavingsAccountModalInput = document.getElementById('objetivo-savings-account-modal');
    const montoActualSavingsAccountModalInput = document.getElementById('monto-actual-savings-account-modal');
    const monedaSavingsAccountModalSelect = document.getElementById('moneda-savings-account-modal');
    const iconSavingsAccountModalInput = document.getElementById('icon-savings-account-modal-input');
    const iconPickerSavingsAccountContainer = document.getElementById('icon-picker-savings-account');
    const openAddSavingsAccountModalBtn = document.getElementById('open-add-savings-account-modal-btn');
    const listaCuentasAhorroEl = document.getElementById('lista-cuentas-ahorro');
    const noSavingsAccountsMessageEl = document.getElementById('no-savings-accounts-message');

    // Category Modal Elements
    const categoryModal = document.getElementById('category-modal');
    const categoryModalTitle = document.getElementById('category-modal-title');
    const closeCategoryModalBtn = document.getElementById('close-category-modal-btn');
    const cancelCategoryModalBtn = document.getElementById('cancel-category-modal-btn');
    const categoryFormModal = document.getElementById('category-form-modal');
    const categoryIdEditInput = document.getElementById('category-id-edit');
    const nombreCategoryModalInput = document.getElementById('nombre-category-modal');
    const colorCategoryModalInput = document.getElementById('color-category-modal');
    const iconCategoryModalInput = document.getElementById('icon-category-modal-input');
    const iconPickerCategoryContainer = document.getElementById('icon-picker-category');
    const openAddCategoryModalBtn = document.getElementById('open-add-category-modal-btn');
    const listaCategoriasGestionEl = document.getElementById('lista-categorias-gestion');
    const noCategoriesMessageEl = document.getElementById('no-categories-message');

    // Debt Modal Elements (Old, for Editing)
    const debtModal = document.getElementById('debt-modal');
    const debtModalTitle = document.getElementById('debt-modal-title');
    const closeDebtModalBtn = document.getElementById('close-debt-modal-btn');
    const cancelDebtModalBtn = document.getElementById('cancel-debt-modal-btn');
    const debtFormModal = document.getElementById('debt-form-modal');
    const debtIdEditInput = document.getElementById('debt-id-edit');
    const acreedorDebtModalInput = document.getElementById('acreedor-debt-modal');
    const montoTotalDebtModalInput = document.getElementById('monto-total-debt-modal');
    const montoPagadoDebtModalInput = document.getElementById('monto-pagado-debt-modal');
    const monedaDebtModalSelect = document.getElementById('moneda-debt-modal');
    const fechaInicioDebtModalInput = document.getElementById('fecha-inicio-debt-modal');
    const fechaVencimientoDebtModalInput = document.getElementById('fecha-vencimiento-debt-modal');
    const notasDebtModalInput = document.getElementById('notas-debt-modal');
    const debtPagadaCheckbox = document.getElementById('debt-pagada-checkbox');
    const addDebtMainBtn = document.getElementById('add-debt-main-btn'); 
    const listaDeudasGestionEl = document.getElementById('lista-deudas-gestion');
    const noDebtsMessageEl = document.getElementById('no-debts-message');

    // New Debt Wizard Modal Elements
    const debtWizardModal = document.getElementById('debt-wizard-modal');
    const debtWizardTitle = document.getElementById('debt-wizard-title');
    const closeDebtWizardBtn = document.getElementById('close-debt-wizard-btn');
    const debtWizardForm = document.getElementById('debt-wizard-form');
    const debtWizardStep1 = document.getElementById('debt-wizard-step-1');
    const debtWizardAcreedorInput = document.getElementById('debt-wizard-acreedor');
    const debtWizardMontoTotalInput = document.getElementById('debt-wizard-monto-total');
    const debtWizardMonedaSelect = document.getElementById('debt-wizard-moneda');
    const debtWizardCancelStep1Btn = document.getElementById('debt-wizard-cancel-step1');
    const debtWizardNextStep1Btn = document.getElementById('debt-wizard-next-step1');
    const debtWizardStep2 = document.getElementById('debt-wizard-step-2');
    const debtWizardMontoPagadoInput = document.getElementById('debt-wizard-monto-pagado');
    const debtWizardFechaInicioInput = document.getElementById('debt-wizard-fecha-inicio');
    const debtWizardFechaVencimientoInput = document.getElementById('debt-wizard-fecha-vencimiento');
    const debtWizardPrevStep2Btn = document.getElementById('debt-wizard-prev-step2');
    const debtWizardNextStep2Btn = document.getElementById('debt-wizard-next-step2');
    const debtWizardCancelStep2Btn = document.getElementById('debt-wizard-cancel-step2');
    const debtWizardStep3 = document.getElementById('debt-wizard-step-3');
    const debtWizardNotasInput = document.getElementById('debt-wizard-notas');
    const debtWizardPagadaCheckbox = document.getElementById('debt-wizard-pagada-checkbox');
    const debtWizardPrevStep3Btn = document.getElementById('debt-wizard-prev-step3');
    const debtWizardSaveDebtBtn = document.getElementById('debt-wizard-save-debt');
    const debtWizardCancelStep3Btn = document.getElementById('debt-wizard-cancel-step3');
    let currentDebtWizardStep = 1;
    let wizardDebtData = {};


    // Salary Allocation Elements
    const salaryAllocationFormEl = document.getElementById('salary-allocation-form');
    const salarioCategoryDisplayEl = document.getElementById('salario-category-display');
    const allocationRulesContainerEl = document.getElementById('allocation-rules-container');
    const addAllocationRuleBtnEl = document.getElementById('add-allocation-rule-btn');
    const totalAllocatedPercentageEl = document.getElementById('total-allocated-percentage');
    const enableSalaryAllocationCheckboxEl = document.getElementById('enable-salary-allocation-checkbox');

    // Confirmation Modal Elements
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationModalTitle = document.getElementById('confirmation-modal-title');
    const confirmationModalMessage = document.getElementById('confirmation-modal-message');
    const confirmationModalCancelBtn = document.getElementById('confirmation-modal-cancel-btn');
    const confirmationModalConfirmBtn = document.getElementById('confirmation-modal-confirm-btn');
    let currentConfirmCallback = null;

    // Dashboard Elements
    const dbIngresosTotalesEl = document.getElementById('db-ingresos-totales');
    const dbGastosTotalesEl = document.getElementById('db-gastos-totales');
    const dbBalanceNetoEl = document.getElementById('db-balance-neto');
    const dbAhorroMesEl = document.getElementById('db-ahorro-mes');
    const dbProximosPagosEl = document.getElementById('db-proximos-pagos');
    const dbListaTransaccionesRecientesEl = document.getElementById('db-lista-transacciones-recientes');
    const dbSaldoEfectivoEl = document.getElementById('db-saldo-efectivo');
    const dbSaldoTarjetaEl = document.getElementById('db-saldo-tarjeta');
    const dbSaldoEfectivoLabelEl = document.getElementById('db-saldo-efectivo-label');
    const dbSaldoTarjetaLabelEl = document.getElementById('db-saldo-tarjeta-label');
    const gastosCategoriaChartDbCanvas = document.getElementById('gastos-categoria-chart-db');
    const gastosCategoriaChartDbNoDataEl = document.getElementById('gastos-categoria-chart-db-no-data');
    const ingresosGastosMesChartDbCanvas = document.getElementById('ingresos-gastos-mes-chart-db');
    const ingresosGastosMesChartDbNoDataEl = document.getElementById('ingresos-gastos-mes-chart-db-no-data');
    const dbChartPeriodSelect = document.getElementById('db-chart-period-select');
    const dbChartGroupingSelect = document.getElementById('db-chart-grouping-select');
    const dbChartCustomDateRangeEl = document.getElementById('db-chart-custom-date-range');
    const dbChartStartDateInput = document.getElementById('db-chart-start-date');
    const dbChartEndDateInput = document.getElementById('db-chart-end-date');
    const dbChartDataViewSelect = document.getElementById('db-chart-data-view-select');
    const dbIngresosTotalesLabelEl = document.getElementById('db-ingresos-totales-label');
    const dbGastosTotalesLabelEl = document.getElementById('db-gastos-totales-label');
    const dbBalanceNetoLabelEl = document.getElementById('db-balance-neto-label');
    const dbAhorroMesLabelEl = document.getElementById('db-ahorro-mes-label');
    const gastosCategoriaChartDbTitleEl = document.getElementById('gastos-categoria-chart-db-title');
    const ingresosGastosMesChartDbTitleEl = document.getElementById('ingresos-gastos-mes-chart-db-title');

    // Transactions View Elements
    const tablaTransaccionesBodyEl = document.getElementById('tabla-transacciones-body');
    const filterTipoTransaccionEl = document.getElementById('filter-tipo-transaccion');
    const filterCategoriaTransaccionEl = document.getElementById('filter-categoria-transaccion');
    const filterFuenteMetodoTransaccionEl = document.getElementById('filter-fuente-metodo-transaccion');
    const noTransactionsMessageEl = document.getElementById('no-transactions-message');
    const exportCsvBtn = document.getElementById('export-csv-btn');

    // Data Management Elements
    const exportAllDataBtn = document.getElementById('export-all-data-btn');
    const importAllDataBtn = document.getElementById('import-all-data-btn');
    const importAllDataInput = document.getElementById('import-all-data-input');
    const importedFileNameEl = document.getElementById('imported-file-name');
    const deleteAllDataBtn = document.getElementById('delete-all-data-btn');

    // Reports Elements
    const reportTypeSelectEl = document.getElementById('report-type-select');
    const reportStartDateInputEl = document.getElementById('report-start-date');
    const reportEndDateInputEl = document.getElementById('report-end-date');
    const generateReportBtnEl = document.getElementById('generate-report-btn');
    const reportDisplayAreaEl = document.getElementById('report-display-area');
    const reportPlaceholderMessageEl = document.getElementById('report-placeholder-message');
    let reportGastosCategoriaChartInstance = null; // Changed variable name
    let reportIngresosVsGastosAnualChartInstance = null; // Changed variable name
    let reportFlujoCajaChartInstance = null; // New variable for cash flow chart


    // --- Application State ---
    let transacciones = [];
    let categorias = [];
    let deudas = [];
    let cuentasAhorro = [];
    let salaryAllocationRule = {
        enabled: false,
        salaryCategoryId: null,
        allocations: []
    };
    let currentDisplayCurrency = DEFAULT_CURRENCY;


    const DEFAULT_CATEGORIES = [
        { id: 'cat0', nombre: SALARY_CATEGORY_NAME, color: '#10B981', icono: 'fas fa-money-bill-wave', isSalary: true },
        { id: 'cat1', nombre: 'Comida y Bebida', color: '#FF6384', icono: 'fas fa-utensils' },
        { id: 'cat2', nombre: 'Supermercado', color: '#FF9F40', icono: 'fas fa-shopping-cart' },
        { id: 'cat3', nombre: 'Transporte', color: '#36A2EB', icono: 'fas fa-bus-alt' },
        { id: 'cat4', nombre: 'Coche', color: '#4CAF50', icono: 'fas fa-car' },
        { id: 'cat5', nombre: 'Hogar (Facturas, Alquiler)', color: '#FFCE56', icono: 'fas fa-home' },
        { id: 'cat6', nombre: 'Salud y Bienestar', color: '#4BC0C0', icono: 'fas fa-heartbeat' },
        { id: 'cat7', nombre: 'Cuidado Personal', color: '#BA68C8', icono: 'fas fa-spa' },
        { id: 'cat8', nombre: 'Ropa y Accesorios', color: '#F06292', icono: 'fas fa-tshirt' },
        { id: 'cat9', nombre: 'Entretenimiento y Ocio', color: '#9575CD', icono: 'fas fa-film' },
        { id: 'cat10', nombre: 'Suscripciones', color: '#78909C', icono: 'fas fa-rss-square' },
        { id: 'cat11', nombre: 'Educación', color: '#A1887F', icono: 'fas fa-graduation-cap' },
        { id: 'cat12', nombre: 'Regalos y Donaciones', color: '#FF8A65', icono: 'fas fa-gift' },
        { id: 'cat13', nombre: 'Mascotas', color: '#90A4AE', icono: 'fas fa-paw' },
        { id: 'cat14', nombre: 'Viajes y Vacaciones', color: '#4DD0E1', icono: 'fas fa-plane-departure' },
        { id: 'cat15', nombre: 'Deportes y Gimnasio', color: '#AED581', icono: 'fas fa-dumbbell' },
        { id: 'cat16', nombre: 'Ahorros (Aportes)', color: '#66BB6A', icono: 'fas fa-piggy-bank' },
        { id: 'cat17', nombre: 'Pagos de Deudas', color: '#7E57C2', icono: 'fas fa-file-invoice-dollar' },
        { id: 'cat18', nombre: 'Impuestos', color: '#FFB74D', icono: 'fas fa-landmark' },
        { id: 'cat19', nombre: 'Otros Gastos', color: '#BDBDBD', icono: 'fas fa-ellipsis-h' }
    ];

    let gastosCategoriaChartDb = null;
    let ingresosGastosMesChartDb = null;

    // --- DATA PERSISTENCE (LocalStorage) ---
    function guardarDatos() {
        localStorage.setItem(LS_KEYS.TRANSACTIONS, JSON.stringify(transacciones));
        localStorage.setItem(LS_KEYS.CATEGORIES, JSON.stringify(categorias));
        localStorage.setItem(LS_KEYS.DEBTS, JSON.stringify(deudas));
        localStorage.setItem(LS_KEYS.SAVINGS_ACCOUNTS, JSON.stringify(cuentasAhorro));
        localStorage.setItem(LS_KEYS.SALARY_ALLOCATION_RULE, JSON.stringify(salaryAllocationRule));
        localStorage.setItem(LS_KEYS.DISPLAY_CURRENCY, currentDisplayCurrency);
    }

    function cargarDatos() {
        const transaccionesData = JSON.parse(localStorage.getItem(LS_KEYS.TRANSACTIONS) || '[]');
        transacciones = transaccionesData.map(tx => ({
            ...tx,
            fuenteCuentaAhorroId: tx.fuenteCuentaAhorroId || null,
            fuenteIngreso: tx.fuenteIngreso || null,
            metodoPago: tx.metodoPago || null
        }));

        const categoriasData = localStorage.getItem(LS_KEYS.CATEGORIES);
        if (categoriasData && JSON.parse(categoriasData).length > 0) {
             categorias = JSON.parse(categoriasData);
             categorias = categorias.map(cat => ({ ...cat, id: cat.id || generateRandomId(), icono: cat.icono || DEFAULT_CATEGORY_ICON }));
             if (!categorias.find(cat => cat.nombre === SALARY_CATEGORY_NAME)) {
                const salaryCatFromDefaults = DEFAULT_CATEGORIES.find(dc => dc.nombre === SALARY_CATEGORY_NAME);
                if (salaryCatFromDefaults) categorias.unshift({...salaryCatFromDefaults, id: salaryCatFromDefaults.id || generateRandomId()});
             }
        } else {
            categorias = DEFAULT_CATEGORIES.map(cat => ({ ...cat, id: cat.id || generateRandomId(), icono: cat.icono || DEFAULT_CATEGORY_ICON }));
        }

        deudas = JSON.parse(localStorage.getItem(LS_KEYS.DEBTS) || '[]');
        cuentasAhorro = JSON.parse(localStorage.getItem(LS_KEYS.SAVINGS_ACCOUNTS) || '[]');
        cuentasAhorro = cuentasAhorro.map(sa => ({ ...sa, icono: sa.icono || DEFAULT_SAVINGS_ICON }));

        const storedSalaryRule = localStorage.getItem(LS_KEYS.SALARY_ALLOCATION_RULE);
        if (storedSalaryRule) {
            salaryAllocationRule = JSON.parse(storedSalaryRule);
        }
        const salaryCat = categorias.find(c => c.nombre === SALARY_CATEGORY_NAME);
        if (salaryCat) {
            salaryAllocationRule.salaryCategoryId = salaryCat.id;
            if(salarioCategoryDisplayEl) salarioCategoryDisplayEl.value = salaryCat.nombre;
        } else {
             if(salarioCategoryDisplayEl) salarioCategoryDisplayEl.value = "Categoría 'Salario' no encontrada. Por favor, créala.";
        }

        currentDisplayCurrency = localStorage.getItem(LS_KEYS.DISPLAY_CURRENCY) || DEFAULT_CURRENCY;
        renderizarTodo();
    }

    // --- RENDER FUNCTIONS ---
    function renderizarTodo() {
        popularCategoriasDatalist();
        actualizarFiltroCategorias();
        populateDisplayCurrencySelect();
        renderizarDashboard();
        renderizarTablaTransacciones();
        renderizarListaCategoriasGestion();
        renderizarListaDeudas();
        renderizarListaCuentasAhorro();
        renderizarSalaryAllocationForm();

        populateCurrencySelect('moneda-transaccion-modal', DEFAULT_CURRENCY); 
        populateCurrencySelect('wizard-moneda', DEFAULT_CURRENCY); 
        populateCurrencySelect('moneda-savings-account-modal', DEFAULT_CURRENCY);
        populateCurrencySelect('moneda-debt-modal', DEFAULT_CURRENCY); 
        populateCurrencySelect('debt-wizard-moneda', DEFAULT_CURRENCY); 
    }

    function popularCategoriasDatalist() {
        if(categoriasDatalistModalEl) {
            categoriasDatalistModalEl.innerHTML = '';
            categorias.sort((a,b) => a.nombre.localeCompare(b.nombre)).forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.nombre;
                categoriasDatalistModalEl.appendChild(option);
            });
        }
    }

    function actualizarFiltroCategorias() {
        if(filterCategoriaTransaccionEl) {
            const currentFilterValue = filterCategoriaTransaccionEl.value;
            filterCategoriaTransaccionEl.innerHTML = '<option value="todas">Todas las Categorías</option>';
            categorias.sort((a, b) => a.nombre.localeCompare(b.nombre)).forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.nombre;
                filterCategoriaTransaccionEl.appendChild(option);
            });
            if (categorias.some(cat => cat.id === currentFilterValue)) {
                filterCategoriaTransaccionEl.value = currentFilterValue;
            }
        }
    }

    // --- Navigation ---
    function cambiarVista(vistaId) {
        Object.values(views).forEach(view => view.classList.add('view-hidden'));
        if (views[vistaId]) {
            views[vistaId].classList.remove('view-hidden');
            views[vistaId].setAttribute('aria-hidden', 'false');
            fabAddTransactionBtn.classList.toggle('view-hidden', vistaId !== 'dashboard');
        } else {
            fabAddTransactionBtn.classList.add('view-hidden');
        }
         Object.values(views).filter(v => v !== views[vistaId]).forEach(v => v.setAttribute('aria-hidden', 'true'));

        Object.values(navLinks).forEach(link => link.classList.remove('active'));
        if (navLinks[vistaId]) {
            navLinks[vistaId].classList.add('active');
            mainHeaderTitle.textContent = navLinks[vistaId].textContent.trim();
        } else if (vistaId === 'help') {
            mainHeaderTitle.textContent = "Ayuda y Soporte";
        } else if (vistaId === 'privacyPolicy') {
            mainHeaderTitle.textContent = "Política de Privacidad";
        } else if (vistaId === 'dataManagement') {
             mainHeaderTitle.textContent = "Configuración y Datos";
        }

        if (vistaId === 'dashboard') renderizarDashboard();
        if (vistaId === 'salaryAllocation') renderizarSalaryAllocationForm();
        if (vistaId === 'reports') {
            if (reportTypeSelectEl) reportTypeSelectEl.dispatchEvent(new Event('change')); // Trigger change to set default dates if needed
            reportDisplayAreaEl.innerHTML = ''; // Clear previous report
            if(reportPlaceholderMessageEl && reportDisplayAreaEl) { // Check if elements exist
                reportDisplayAreaEl.appendChild(reportPlaceholderMessageEl);
                reportPlaceholderMessageEl.classList.remove('view-hidden');
            }
             // Destroy previous charts if they exist
            if (reportFlujoCajaChartInstance) { reportFlujoCajaChartInstance.destroy(); reportFlujoCajaChartInstance = null; }
            if (reportGastosCategoriaChartInstance) { reportGastosCategoriaChartInstance.destroy(); reportGastosCategoriaChartInstance = null; }
            if (reportIngresosVsGastosAnualChartInstance) { reportIngresosVsGastosAnualChartInstance.destroy(); reportIngresosVsGastosAnualChartInstance = null; }
        }
    }

    // --- MODAL HANDLING ---
    function openModal(modalElement) {
        modalElement.classList.remove('view-hidden');
        modalElement.setAttribute('aria-hidden', 'false');
        setTimeout(() => modalElement.querySelector('.modal-content').classList.replace('scale-95', 'scale-100'), 10);
        const firstFocusable = modalElement.querySelector('input:not([type="hidden"]), select, button, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }

    function closeModal(modalElement) {
        modalElement.querySelector('.modal-content').classList.replace('scale-100', 'scale-95');
        setTimeout(() => {
            modalElement.classList.add('view-hidden');
            modalElement.setAttribute('aria-hidden', 'true');
        }, 250);
    }

    function actualizarCamposTransaccionModal() { 
        if (!tipoTransaccionModalEl) return;

        const tipoTransaccion = tipoTransaccionModalEl.value;
        const monedaSeleccionada = monedaTransaccionModalEl.value;
        const gastarDesdeCuenta = fuenteCuentaAhorroSelectModal.value !== 'general';

        fuenteIngresoContainerModal.classList.toggle('view-hidden', tipoTransaccion !== 'ingreso');
        metodoPagoContainerModal.classList.toggle('view-hidden', tipoTransaccion !== 'gasto');
        fuenteCuentaAhorroContainerModal.classList.toggle('view-hidden', tipoTransaccion !== 'gasto');

        if (tipoTransaccion === 'gasto') {
            const currentSelectedFuente = fuenteCuentaAhorroSelectModal.value;
            fuenteCuentaAhorroSelectModal.innerHTML = '<option value="general">No / Usar Efectivo o Tarjeta</option>';
            cuentasAhorro
                .filter(sa => sa.moneda === monedaSeleccionada)
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .forEach(sa => {
                    const option = document.createElement('option');
                    option.value = sa.id;
                    option.textContent = `${sa.nombre} (${formatCurrency(sa.montoActual, sa.moneda)})`;
                    fuenteCuentaAhorroSelectModal.appendChild(option);
                });

            if (cuentasAhorro.some(sa => sa.id === currentSelectedFuente && sa.moneda === monedaSeleccionada)) {
                fuenteCuentaAhorroSelectModal.value = currentSelectedFuente;
            } else {
                fuenteCuentaAhorroSelectModal.value = 'general';
            }
            metodoPagoSelectModal.disabled = gastarDesdeCuenta;
            if (gastarDesdeCuenta) metodoPagoSelectModal.value = 'efectivo'; 
        } else {
            fuenteCuentaAhorroSelectModal.value = 'general';
            metodoPagoSelectModal.disabled = false;
        }
    }

    function abrirTransactionModal(transaccionParaEditar = null) { 
        if (!transactionFormModal) return;
        transactionFormModal.reset();
        transactionIdEditInput.value = '';
        fechaTransaccionModalEl.valueAsDate = new Date();
        populateCurrencySelect('moneda-transaccion-modal', DEFAULT_CURRENCY);
        fuenteIngresoSelectModal.value = 'efectivo';
        metodoPagoSelectModal.value = 'efectivo';

        if (transaccionParaEditar) {
            transactionModalTitle.textContent = 'Editar Transacción';
            transactionIdEditInput.value = transaccionParaEditar.id;
            tipoTransaccionModalEl.value = transaccionParaEditar.tipo;
            const categoriaObj = categorias.find(c => c.id === transaccionParaEditar.categoriaId);
            categoriaTransaccionModalEl.value = categoriaObj ? categoriaObj.nombre : '';
            montoTransaccionModalEl.value = transaccionParaEditar.monto;
            monedaTransaccionModalEl.value = transaccionParaEditar.moneda || DEFAULT_CURRENCY;
            fechaTransaccionModalEl.value = transaccionParaEditar.fecha;
            descripcionTransaccionModalEl.value = transaccionParaEditar.descripcion;
            if (transaccionParaEditar.tipo === 'ingreso' && transaccionParaEditar.fuenteIngreso) {
                fuenteIngresoSelectModal.value = transaccionParaEditar.fuenteIngreso;
            }
            if (transaccionParaEditar.tipo === 'gasto') {
                if (transaccionParaEditar.fuenteCuentaAhorroId && transaccionParaEditar.fuenteCuentaAhorroId !== 'general') {
                    fuenteCuentaAhorroSelectModal.value = transaccionParaEditar.fuenteCuentaAhorroId;
                } else if (transaccionParaEditar.metodoPago) {
                    metodoPagoSelectModal.value = transaccionParaEditar.metodoPago;
                    fuenteCuentaAhorroSelectModal.value = 'general';
                } else {
                     fuenteCuentaAhorroSelectModal.value = 'general';
                     metodoPagoSelectModal.value = 'efectivo';
                }
            }
        } else {
            transactionModalTitle.textContent = 'Nueva Transacción (Antiguo)';
        }
        popularCategoriasDatalist();
        actualizarCamposTransaccionModal();
        openModal(transactionModal);
    }

    // --- TRANSACTION WIZARD LOGIC (for New Transactions) ---
    function resetTransactionWizard() {
        wizardTransactionData = {
            tipo: '',
            metodo: '',
            monto: '',
            moneda: wizardMonedaSelect.value || currentDisplayCurrency,
            categoriaId: '',
            fuenteCuentaAhorroId: 'general',
            fecha: new Date().toISOString().split('T')[0],
            descripcion: ''
        };
        currentTransactionWizardStep = 1;
        wizardTipoTransaccionInput.value = '';
        wizardMetodoPagoInput.value = '';
        wizardCategoriaIdInput.value = '';
        wizardMontoInput.value = '';
        wizardDescripcionInput.value = '';
        wizardFechaInput.valueAsDate = new Date();

        [wizardTypeIngresoBtn, wizardTypeGastoBtn, wizardMethodEfectivoBtn, wizardMethodTarjetaBtn].forEach(btn => btn.classList.remove('selected'));
        const selectedCatItem = wizardCategorySelectionGrid.querySelector('.wizard-selection-item.selected');
        if (selectedCatItem) selectedCatItem.classList.remove('selected');
        wizardFuenteCuentaAhorroSelect.value = 'general';

        navigateToTransactionWizardStep(1);
    }

    function navigateToTransactionWizardStep(stepNumber) {
        currentTransactionWizardStep = stepNumber;
        document.querySelectorAll('#transaction-wizard-modal .wizard-step').forEach(step => step.classList.remove('active'));
        document.getElementById(`wizard-step-${stepNumber}`).classList.add('active');
        transactionWizardTitle.textContent = `Nueva Transacción (Paso ${stepNumber}/3)`;

        if (stepNumber === 1) {
            populateCurrencySelect('wizard-moneda', wizardTransactionData.moneda || currentDisplayCurrency);
            if(wizardTransactionData.tipo) document.getElementById(`wizard-type-${wizardTransactionData.tipo}`).classList.add('selected');
            if(wizardTransactionData.metodo) document.getElementById(`wizard-method-${wizardTransactionData.metodo}`).classList.add('selected');
            wizardMontoInput.value = wizardTransactionData.monto;
        } else if (stepNumber === 2) {
            prepareTransactionWizardStep2();
        } else if (stepNumber === 3) {
            wizardFechaInput.value = wizardTransactionData.fecha;
            wizardDescripcionInput.value = wizardTransactionData.descripcion;
        }
    }

    function prepareTransactionWizardStep2() {
        const tipo = wizardTransactionData.tipo;
        wizardGastarDesdeContainer.classList.toggle('view-hidden', tipo !== 'gasto');
        wizardCategorySelectionGrid.innerHTML = '';

        if (tipo === 'gasto') {
            wizardCategoriaLabel.textContent = 'Categoría de Gasto:';
            const currentSelectedCuenta = wizardTransactionData.fuenteCuentaAhorroId || 'general';
            wizardFuenteCuentaAhorroSelect.innerHTML = '<option value="general">Efectivo / Tarjeta (seleccionado antes)</option>';
            cuentasAhorro
                .filter(sa => sa.moneda === wizardTransactionData.moneda)
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .forEach(sa => {
                    const option = document.createElement('option');
                    option.value = sa.id;
                    option.textContent = `${sa.nombre} (${formatCurrency(sa.montoActual, sa.moneda)})`;
                    wizardFuenteCuentaAhorroSelect.appendChild(option);
                });
            wizardFuenteCuentaAhorroSelect.value = currentSelectedCuenta;

            const spendingFromSavings = wizardFuenteCuentaAhorroSelect.value !== 'general';
            wizardCategorySelectionGrid.classList.toggle('view-hidden', spendingFromSavings);
            wizardCategoriaLabel.classList.toggle('view-hidden', spendingFromSavings);

            if (!spendingFromSavings) {
                categorias.filter(cat => cat.nombre !== SALARY_CATEGORY_NAME).forEach(cat => createCategoryItemForTransactionWizard(cat));
            }

        } else { // Ingreso
            wizardCategoriaLabel.textContent = 'Categoría de Ingreso:';
            wizardCategorySelectionGrid.classList.remove('view-hidden');
            wizardCategoriaLabel.classList.remove('view-hidden');
            categorias.forEach(cat => createCategoryItemForTransactionWizard(cat));
        }
        if (wizardTransactionData.categoriaId) {
            const selectedItem = wizardCategorySelectionGrid.querySelector(`[data-id="${wizardTransactionData.categoriaId}"]`);
            if (selectedItem) selectedItem.classList.add('selected');
        }
    }

    function createCategoryItemForTransactionWizard(cat) {
        const item = document.createElement('div');
        item.className = 'wizard-selection-item focusable';
        item.dataset.id = cat.id;
        item.innerHTML = `<i class="${cat.icono || DEFAULT_CATEGORY_ICON}" style="color: ${cat.color};"></i><span>${cat.nombre}</span>`;
        item.addEventListener('click', () => {
            const currentSelected = wizardCategorySelectionGrid.querySelector('.selected');
            if (currentSelected) currentSelected.classList.remove('selected');
            item.classList.add('selected');
            wizardTransactionData.categoriaId = cat.id;
            wizardCategoriaIdInput.value = cat.id;
        });
        wizardCategorySelectionGrid.appendChild(item);
    }


    // --- TRANSACTION HANDLING (Old Modal & Wizard) ---
    function guardarTransaccionFinal(transaccionData) {
        const esEdicion = transacciones.some(t => t.id === transaccionData.id);

        if (esEdicion) {
            const index = transacciones.findIndex(t => t.id === transaccionData.id);
            const originalTransaction = transacciones[index];
            if (originalTransaction.tipo === 'gasto' && originalTransaction.fuenteCuentaAhorroId && originalTransaction.fuenteCuentaAhorroId !== 'general') {
                const oldCuenta = cuentasAhorro.find(sa => sa.id === originalTransaction.fuenteCuentaAhorroId);
                if (oldCuenta && oldCuenta.moneda === originalTransaction.moneda) {
                    oldCuenta.montoActual = parseFloat((oldCuenta.montoActual + parseFloat(originalTransaction.monto)).toFixed(2));
                }
            }
            transacciones[index] = transaccionData;
        } else {
            transacciones.push(transaccionData);
        }

        if (transaccionData.tipo === 'gasto' && transaccionData.fuenteCuentaAhorroId && transaccionData.fuenteCuentaAhorroId !== 'general') {
            const cuentaSeleccionada = cuentasAhorro.find(sa => sa.id === transaccionData.fuenteCuentaAhorroId);
            if (cuentaSeleccionada) {
                if (cuentaSeleccionada.moneda !== transaccionData.moneda) {
                    showMessage(`Moneda de cuenta "${cuentaSeleccionada.nombre}" (${cuentaSeleccionada.moneda}) no coincide con transacción (${transaccionData.moneda}). Gasto no deducido de cuenta.`, 'error', 7000);
                } else {
                    if (cuentaSeleccionada.montoActual < transaccionData.monto && !esEdicion) { 
                         showMessage(`Fondos insuficientes en "${cuentaSeleccionada.nombre}". Saldo: ${formatCurrency(cuentaSeleccionada.montoActual, cuentaSeleccionada.moneda)}. Gasto registrado.`, 'info', 7000);
                    }
                    cuentaSeleccionada.montoActual = parseFloat((cuentaSeleccionada.montoActual - transaccionData.monto).toFixed(2));
                }
            }
        }

        const categoriaSalario = categorias.find(c => c.nombre === SALARY_CATEGORY_NAME);
        if (transaccionData.tipo === 'ingreso' &&
            categoriaSalario &&
            transaccionData.categoriaId === categoriaSalario.id &&
            !transaccionData.esAsignacion &&
            !esEdicion) { 
            aplicarAsignacionSalario(transaccionData);
        }

        renderizarTodo();
        guardarDatos();
        showMessage(esEdicion ? 'Transacción actualizada.' : 'Transacción guardada.', 'success');

        if (!transactionModal.classList.contains('view-hidden')) {
            closeModal(transactionModal);
        }
        if (!transactionWizardModal.classList.contains('view-hidden')) {
            closeModal(transactionWizardModal);
        }
    }


    // --- Event Listeners for Modals and Forms ---
    if (closeTransactionModalBtn) closeTransactionModalBtn.addEventListener('click', () => closeModal(transactionModal));
    if (cancelTransactionModalBtn) cancelTransactionModalBtn.addEventListener('click', () => closeModal(transactionModal));
    if (tipoTransaccionModalEl) tipoTransaccionModalEl.addEventListener('change', actualizarCamposTransaccionModal);
    if (monedaTransaccionModalEl) monedaTransaccionModalEl.addEventListener('change', actualizarCamposTransaccionModal);
    if (fuenteCuentaAhorroSelectModal) fuenteCuentaAhorroSelectModal.addEventListener('change', actualizarCamposTransaccionModal);

    if (transactionFormModal) { 
        transactionFormModal.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = transactionIdEditInput.value || generateRandomId(); 
            const tipo = tipoTransaccionModalEl.value;
            const categoriaNombre = categoriaTransaccionModalEl.value.trim();
            const monto = parseFloat(montoTransaccionModalEl.value);
            const moneda = monedaTransaccionModalEl.value;
            const fecha = fechaTransaccionModalEl.value;
            const descripcion = descripcionTransaccionModalEl.value.trim();
            const fuenteIngreso = (tipo === 'ingreso') ? fuenteIngresoSelectModal.value : null;
            let metodoPago = null;
            let fuenteCuentaAhorroId = null;

            if (tipo === 'gasto') {
                if (fuenteCuentaAhorroSelectModal.value !== 'general') {
                    fuenteCuentaAhorroId = fuenteCuentaAhorroSelectModal.value;
                } else {
                    metodoPago = metodoPagoSelectModal.value;
                }
            }

            if (!categoriaNombre || !monto || monto <= 0 || !fecha || !moneda) {
                showMessage("Completa los campos obligatorios (Categoría, Monto, Moneda, Fecha).", 'error'); return;
            }
            if (tipo === 'ingreso' && !fuenteIngreso) {
                showMessage("Selecciona la fuente del ingreso (Efectivo/Tarjeta).", 'error'); return;
            }
            if (tipo === 'gasto' && !fuenteCuentaAhorroId && !metodoPago) {
                showMessage("Selecciona el método de pago (Efectivo/Tarjeta) o una cuenta de ahorro.", 'error'); return;
            }

            let categoriaObj = categorias.find(c => c.nombre.toLowerCase() === categoriaNombre.toLowerCase());
            if (!categoriaObj) {
                categoriaObj = { id: generateRandomId(), nombre: categoriaNombre, color: '#cccccc', icono: DEFAULT_CATEGORY_ICON };
                categorias.push(categoriaObj);
                categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }

            const esEdicion = Boolean(transactionIdEditInput.value);
            let originalTransactionData = null;
            if (esEdicion) originalTransactionData = transacciones.find(t => t.id === id);

            const transaccionData = {
                id, tipo, categoriaId: categoriaObj.id, monto, moneda, fecha, descripcion,
                fuenteIngreso, metodoPago, fuenteCuentaAhorroId,
                esAsignacion: (esEdicion && originalTransactionData) ? originalTransactionData.esAsignacion : false,
                origenTransaccionId: (esEdicion && originalTransactionData) ? originalTransactionData.origenTransaccionId : null,
                cuentaAhorroDestinoId: (esEdicion && originalTransactionData) ? originalTransactionData.cuentaAhorroDestinoId : null
            };
            guardarTransaccionFinal(transaccionData); 
        });
    }

    fabAddTransactionBtn.addEventListener('click', () => {
        resetTransactionWizard();
        openModal(transactionWizardModal);
    });
    closeTransactionWizardBtn.addEventListener('click', () => closeModal(transactionWizardModal));

    wizardTypeIngresoBtn.addEventListener('click', () => {
        wizardTypeIngresoBtn.classList.add('selected');
        wizardTypeGastoBtn.classList.remove('selected');
        wizardTransactionData.tipo = 'ingreso';
        wizardTipoTransaccionInput.value = 'ingreso';
    });
    wizardTypeGastoBtn.addEventListener('click', () => {
        wizardTypeGastoBtn.classList.add('selected');
        wizardTypeIngresoBtn.classList.remove('selected');
        wizardTransactionData.tipo = 'gasto';
        wizardTipoTransaccionInput.value = 'gasto';
    });
    wizardMethodEfectivoBtn.addEventListener('click', () => {
        wizardMethodEfectivoBtn.classList.add('selected');
        wizardMethodTarjetaBtn.classList.remove('selected');
        wizardTransactionData.metodo = 'efectivo';
        wizardMetodoPagoInput.value = 'efectivo';
    });
    wizardMethodTarjetaBtn.addEventListener('click', () => {
        wizardMethodTarjetaBtn.classList.add('selected');
        wizardMethodEfectivoBtn.classList.remove('selected');
        wizardTransactionData.metodo = 'tarjeta';
        wizardMetodoPagoInput.value = 'tarjeta';
    });

    wizardNextStep1Btn.addEventListener('click', () => {
        if (!wizardTransactionData.tipo) { showMessage('Selecciona Ingreso o Gasto.', 'error'); return; }
        if (!wizardTransactionData.metodo) { showMessage('Selecciona Efectivo o Tarjeta.', 'error'); return; }
        const monto = parseFloat(wizardMontoInput.value);
        if (isNaN(monto) || monto <= 0) { showMessage('Ingresa un monto válido.', 'error'); return; }
        wizardTransactionData.monto = monto;
        wizardTransactionData.moneda = wizardMonedaSelect.value;
        navigateToTransactionWizardStep(2);
    });
    wizardCancelStep1Btn.addEventListener('click', () => closeModal(transactionWizardModal));

    wizardFuenteCuentaAhorroSelect.addEventListener('change', (e) => {
        wizardTransactionData.fuenteCuentaAhorroId = e.target.value;
        const spendingFromSavings = wizardTransactionData.fuenteCuentaAhorroId !== 'general';
        wizardCategorySelectionGrid.classList.toggle('view-hidden', spendingFromSavings);
        wizardCategoriaLabel.classList.toggle('view-hidden', spendingFromSavings);
        if (spendingFromSavings) {
            wizardTransactionData.categoriaId = '';
            wizardCategoriaIdInput.value = '';
            const currentSelectedCat = wizardCategorySelectionGrid.querySelector('.selected');
            if (currentSelectedCat) currentSelectedCat.classList.remove('selected');
        } else {
            wizardCategorySelectionGrid.innerHTML = '';
            categorias.filter(cat => cat.nombre !== SALARY_CATEGORY_NAME).forEach(cat => createCategoryItemForTransactionWizard(cat));
        }
    });

    wizardPrevStep2Btn.addEventListener('click', () => navigateToTransactionWizardStep(1));
    wizardNextStep2Btn.addEventListener('click', () => {
        const spendingFromSavings = wizardTransactionData.tipo === 'gasto' && wizardTransactionData.fuenteCuentaAhorroId !== 'general';
        if (!spendingFromSavings && !wizardTransactionData.categoriaId) {
            showMessage('Selecciona una categoría.', 'error'); return;
        }
        navigateToTransactionWizardStep(3);
    });
    wizardCancelStep2Btn.addEventListener('click', () => closeModal(transactionWizardModal));

    wizardPrevStep3Btn.addEventListener('click', () => navigateToTransactionWizardStep(2));
    wizardCancelStep3Btn.addEventListener('click', () => closeModal(transactionWizardModal));

    transactionWizardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        wizardTransactionData.fecha = wizardFechaInput.value;
        wizardTransactionData.descripcion = wizardDescripcionInput.value.trim();

        const finalTransaction = {
            id: generateRandomId(),
            tipo: wizardTransactionData.tipo,
            categoriaId: wizardTransactionData.categoriaId,
            monto: wizardTransactionData.monto,
            moneda: wizardTransactionData.moneda,
            fecha: wizardTransactionData.fecha,
            descripcion: wizardTransactionData.descripcion,
            esAsignacion: false,
            origenTransaccionId: null,
            cuentaAhorroDestinoId: null,
            fuenteIngreso: null,
            metodoPago: null,
            fuenteCuentaAhorroId: null
        };

        if (wizardTransactionData.tipo === 'ingreso') {
            finalTransaction.fuenteIngreso = wizardTransactionData.metodo;
        } else { // Gasto
            if (wizardTransactionData.fuenteCuentaAhorroId && wizardTransactionData.fuenteCuentaAhorroId !== 'general') {
                finalTransaction.fuenteCuentaAhorroId = wizardTransactionData.fuenteCuentaAhorroId;
            } else {
                finalTransaction.metodoPago = wizardTransactionData.metodo;
            }
        }
        if (wizardTransactionData.tipo === 'gasto' && wizardTransactionData.fuenteCuentaAhorroId !== 'general' && !finalTransaction.categoriaId) {
            let transferenciaCat = categorias.find(c => c.nombre.toLowerCase() === "transferencia entre cuentas" || c.nombre.toLowerCase() === "ajuste de ahorro");
            if (transferenciaCat) {
                finalTransaction.categoriaId = transferenciaCat.id;
            }
        }
        
        if (finalTransaction.monto > LARGE_TRANSACTION_THRESHOLD) {
            abrirConfirmationModal('Transacción Grande', `El monto de ${formatCurrency(finalTransaction.monto, finalTransaction.moneda)} es grande. ¿Estás seguro?`, () => guardarTransaccionFinal(finalTransaction));
        } else {
            guardarTransaccionFinal(finalTransaction);
        }
    });


    // --- Transaction Table and Filtering ---
    function getFiltrarTransacciones() {
        const tipoFiltro = filterTipoTransaccionEl.value;
        const categoriaFiltro = filterCategoriaTransaccionEl.value;
        const fuenteMetodoFiltro = filterFuenteMetodoTransaccionEl.value;

        return transacciones.filter(t => {
            const pasaTipo = tipoFiltro === 'todos' || t.tipo === tipoFiltro || (tipoFiltro === 'asignacion' && t.esAsignacion);
            const pasaCategoria = categoriaFiltro === 'todas' || t.categoriaId === categoriaFiltro;

            let pasaFuenteMetodo = true;
            if (fuenteMetodoFiltro !== 'todos') {
                if (fuenteMetodoFiltro === 'efectivo') {
                    pasaFuenteMetodo = (t.tipo === 'ingreso' && t.fuenteIngreso === 'efectivo') || (t.tipo === 'gasto' && t.metodoPago === 'efectivo' && (!t.fuenteCuentaAhorroId || t.fuenteCuentaAhorroId === 'general'));
                } else if (fuenteMetodoFiltro === 'tarjeta') {
                    pasaFuenteMetodo = (t.tipo === 'ingreso' && t.fuenteIngreso === 'tarjeta') || (t.tipo === 'gasto' && t.metodoPago === 'tarjeta' && (!t.fuenteCuentaAhorroId || t.fuenteCuentaAhorroId === 'general'));
                } else if (fuenteMetodoFiltro === 'cuenta_ahorro') {
                    pasaFuenteMetodo = t.tipo === 'gasto' && t.fuenteCuentaAhorroId && t.fuenteCuentaAhorroId !== 'general';
                } else if (fuenteMetodoFiltro === 'no_especificado') {
                     pasaFuenteMetodo = (t.tipo === 'ingreso' && !t.fuenteIngreso) || (t.tipo === 'gasto' && !t.metodoPago && (!t.fuenteCuentaAhorroId || t.fuenteCuentaAhorroId === 'general'));
                }
            }
            return pasaTipo && pasaCategoria && pasaFuenteMetodo;
        }).sort((a,b) => new Date(b.fecha + 'T00:00:00Z') - new Date(a.fecha + 'T00:00:00Z')); 
    }

    function renderizarTablaTransacciones() {
        if (!tablaTransaccionesBodyEl) return;
        tablaTransaccionesBodyEl.innerHTML = '';
        const transaccionesFiltradas = getFiltrarTransacciones();

        if (transaccionesFiltradas.length === 0) {
            noTransactionsMessageEl.classList.remove('hidden');
            tablaTransaccionesBodyEl.innerHTML = `<tr><td colspan="6" class="text-center text-gray-500 py-8 px-4">No hay transacciones que coincidan.</td></tr>`;
            return;
        }
        noTransactionsMessageEl.classList.add('hidden');

        transaccionesFiltradas.forEach(t => {
            const categoria = categorias.find(c => c.id === t.categoriaId) || { nombre: 'Desconocida', color: '#cccccc', icono: DEFAULT_CATEGORY_ICON };
            const fila = tablaTransaccionesBodyEl.insertRow();
            fila.className = `hover:bg-gray-50 transition-colors ${t.esAsignacion ? 'bg-blue-50' : ''}`;

            let iconHTML = `<i class="${categoria.icono}" style="color: ${categoria.color};"></i>`;
            let displayColor = categoria.color;
            let primaryName = categoria.nombre;

            if (t.tipo === 'asignacion' && t.cuentaAhorroDestinoId) {
                const cuentaDestino = cuentasAhorro.find(sa => sa.id === t.cuentaAhorroDestinoId);
                if (cuentaDestino) {
                    iconHTML = `<i class="${cuentaDestino.icono || DEFAULT_SAVINGS_ICON}"></i>`;
                    displayColor = '#4A90E2'; // A distinct color for savings transfers
                    primaryName = `Asignación a ${cuentaDestino.nombre}`;
                } else {
                     iconHTML = `<i class="fas fa-exchange-alt"></i>`;
                     primaryName = `Asignación a cuenta eliminada`;
                }
            }

            let tipoDisplay = t.esAsignacion ? 'Asignación' : (t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1));
            if (t.tipo === 'asignacion' && t.cuentaAhorroDestinoId) tipoDisplay = 'Transf. Ahorro';

            let descripcionPrincipal = t.descripcion || primaryName;
            let subDescripcion = '';

            if (t.tipo === 'gasto') {
                if (t.fuenteCuentaAhorroId && t.fuenteCuentaAhorroId !== 'general') {
                    const cuentaFuente = cuentasAhorro.find(sa => sa.id === t.fuenteCuentaAhorroId);
                    if (cuentaFuente) subDescripcion = `(de: ${cuentaFuente.nombre})`;
                } else if (t.metodoPago) {
                    subDescripcion = `(${t.metodoPago.charAt(0).toUpperCase() + t.metodoPago.slice(1)})`;
                }
            } else if (t.tipo === 'ingreso' && t.fuenteIngreso) {
                subDescripcion = `(${t.fuenteIngreso.charAt(0).toUpperCase() + t.fuenteIngreso.slice(1)})`;
            }

            fila.insertCell().outerHTML = `<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">${new Date(t.fecha + 'T00:00:00Z').toLocaleDateString('es-ES', {timeZone: 'UTC'})}</td>`;
            fila.insertCell().outerHTML = `<td class="px-4 py-4 whitespace-nowrap text-sm"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.tipo === 'ingreso' ? 'bg-green-100 text-green-800' : (t.tipo === 'gasto' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800')}">${tipoDisplay}</span></td>`;
            fila.insertCell().outerHTML = `<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center"><span class="icon-display text-white text-xs mr-2 flex-shrink-0" style="background-color: ${displayColor};">${iconHTML}</span><span class="truncate">${(t.tipo === 'asignacion' && t.cuentaAhorroDestinoId) ? (cuentasAhorro.find(sa => sa.id === t.cuentaAhorroDestinoId)?.nombre || 'Cuenta eliminada') : primaryName}</span></td>`;
            const fullDescTitle = `${descripcionPrincipal} ${subDescripcion ? subDescripcion : ''}`.trim();
            fila.insertCell().outerHTML = `<td class="px-4 py-4 text-sm text-gray-600 truncate max-w-[100px] sm:max-w-xs" title="${fullDescTitle}">${descripcionPrincipal} ${subDescripcion ? `<span class="text-xs text-gray-500 italic block sm:inline">${subDescripcion}</span>` : ''}</td>`;
            fila.insertCell().outerHTML = `<td class="px-4 py-4 whitespace-nowrap text-sm text-right font-medium ${t.tipo === 'ingreso' ? 'text-green-600' : (t.tipo === 'gasto' ? 'text-red-600' : 'text-blue-600')}">${formatCurrency(t.monto, t.moneda)}</td>`;
            fila.insertCell().outerHTML = `<td class="px-4 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">${t.esAsignacion ? '<span class="text-xs text-gray-400">Automática</span>' : `<button onclick="editarTransaccion('${t.id}')" class="text-indigo-600 hover:text-indigo-900 focusable" title="Editar"><i class="fas fa-edit"></i><span class="sr-only">Editar</span></button><button onclick="confirmarEliminarTransaccion('${t.id}')" class="text-red-600 hover:text-red-900 focusable" title="Eliminar"><i class="fas fa-trash"></i><span class="sr-only">Eliminar</span></button>`}</td>`;
        });
    }

    window.editarTransaccion = (id) => {
        const transaccion = transacciones.find(t => t.id === id);
        if (transaccion && !transaccion.esAsignacion) abrirTransactionModal(transaccion);
    };
    window.confirmarEliminarTransaccion = (id) => {
        const transaccion = transacciones.find(t => t.id === id);
        if (!transaccion) return;
        let desc = transaccion.descripcion || (categorias.find(c => c.id === transaccion.categoriaId) || {}).nombre || 'transacción';
        if (transaccion.tipo === 'asignacion' && transaccion.cuentaAhorroDestinoId) {
            const cta = cuentasAhorro.find(sa => sa.id === transaccion.cuentaAhorroDestinoId);
            if(cta) desc = `transferencia a ${cta.nombre}`;
        }
        abrirConfirmationModal('Eliminar Transacción', `¿Seguro que quieres eliminar "${desc}"?`, () => eliminarTransaccion(id));
    };

    function eliminarTransaccion(id) {
        const transaccionAEliminarIndex = transacciones.findIndex(t => t.id === id);
        if (transaccionAEliminarIndex === -1) return;
        const transaccionAEliminar = transacciones[transaccionAEliminarIndex];

        if (transaccionAEliminar.tipo === 'gasto' && transaccionAEliminar.fuenteCuentaAhorroId && transaccionAEliminar.fuenteCuentaAhorroId !== 'general') {
            const cuenta = cuentasAhorro.find(sa => sa.id === transaccionAEliminar.fuenteCuentaAhorroId);
            if (cuenta && cuenta.moneda === transaccionAEliminar.moneda) {
                cuenta.montoActual = parseFloat((cuenta.montoActual + parseFloat(transaccionAEliminar.monto)).toFixed(2));
            }
        } else if (transaccionAEliminar.esAsignacion && transaccionAEliminar.tipo === 'asignacion' && transaccionAEliminar.cuentaAhorroDestinoId) {
            const cuenta = cuentasAhorro.find(sa => sa.id === transaccionAEliminar.cuentaAhorroDestinoId);
            if (cuenta && cuenta.moneda === transaccionAEliminar.moneda) {
                 cuenta.montoActual = parseFloat((cuenta.montoActual - parseFloat(transaccionAEliminar.monto)).toFixed(2));
            }
        }
        if (transaccionAEliminar.tipo === 'ingreso' && categorias.find(c=>c.id === transaccionAEliminar.categoriaId)?.nombre === SALARY_CATEGORY_NAME) {
            transacciones = transacciones.filter(t => t.origenTransaccionId !== id);
        }

        transacciones.splice(transaccionAEliminarIndex, 1);
        renderizarTodo();
        guardarDatos();
        showMessage('Transacción eliminada.', 'success');
    }

    // --- CSV Export ---
    function exportTransactionsToCSV() {
        const transaccionesFiltradas = getFiltrarTransacciones();
        if (transaccionesFiltradas.length === 0) {
            showMessage("No hay transacciones para exportar.", "info");
            return;
        }

        let csvContent = "Fecha,Tipo,Categoria,Descripcion,Monto,Moneda,Fuente/Metodo,Cuenta de Ahorro Origen/Destino\n";

        transaccionesFiltradas.forEach(t => {
            const categoriaObj = categorias.find(c => c.id === t.categoriaId) || { nombre: 'N/A' };
            const fecha = new Date(t.fecha + 'T00:00:00Z').toLocaleDateString('es-ES', {timeZone: 'UTC'}); 
            let tipo = t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1);
            if (t.esAsignacion) tipo = "Asignacion";
            if (t.tipo === 'asignacion' && t.cuentaAhorroDestinoId) tipo = 'Transf. Ahorro';

            let categoriaNombre = categoriaObj.nombre;
            if (t.tipo === 'asignacion' && t.cuentaAhorroDestinoId) {
                 const ctaDest = cuentasAhorro.find(sa => sa.id === t.cuentaAhorroDestinoId);
                 categoriaNombre = ctaDest ? `A: ${ctaDest.nombre}` : 'A: Cuenta Eliminada';
            }

            const descripcion = t.descripcion ? `"${t.descripcion.replace(/"/g, '""')}"` : '';
            const monto = t.monto;
            const moneda = t.moneda;

            let fuenteMetodo = '';
            let cuentaAhorroNombre = '';

            if (t.tipo === 'ingreso') {
                fuenteMetodo = t.fuenteIngreso || 'N/A';
            } else if (t.tipo === 'gasto') {
                if (t.fuenteCuentaAhorroId && t.fuenteCuentaAhorroId !== 'general') {
                    const cuenta = cuentasAhorro.find(sa => sa.id === t.fuenteCuentaAhorroId);
                    fuenteMetodo = 'Desde Cuenta Ahorro';
                    cuentaAhorroNombre = cuenta ? cuenta.nombre : 'ID Cuenta Desconocida';
                } else {
                    fuenteMetodo = t.metodoPago || 'N/A';
                }
            } else if (t.tipo === 'asignacion') { 
                 if (t.cuentaAhorroDestinoId) { 
                    const ctaDest = cuentasAhorro.find(sa => sa.id === t.cuentaAhorroDestinoId);
                    fuenteMetodo = 'A Cuenta Ahorro';
                    cuentaAhorroNombre = ctaDest ? ctaDest.nombre : 'ID Cuenta Destino Desconocida';
                 } else { 
                    fuenteMetodo = 'Asignado (Gasto)';
                 }
            } else {
                fuenteMetodo = 'N/A';
            }

            csvContent += `${fecha},${tipo},"${categoriaNombre}",${descripcion},${monto},${moneda},${fuenteMetodo},"${cuentaAhorroNombre}"\n`;
        });

        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); 
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `transacciones_gestorpro_${new Date().toISOString().slice(0,10)}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showMessage("Transacciones exportadas a CSV.", "success");
        } else {
            showMessage("La exportación CSV no es compatible con tu navegador.", "error");
        }
    }


    // --- SAVINGS ACCOUNTS ---
    function abrirSavingsAccountModal(cuentaParaEditar = null) {
        savingsAccountFormModal.reset();
        savingsAccountIdEditInput.value = '';
        montoActualSavingsAccountModalInput.value = '0';
        populateCurrencySelect('moneda-savings-account-modal', currentDisplayCurrency);
        renderizarIconPicker('icon-picker-savings-account', 'icon-savings-account-modal-input', DEFAULT_SAVINGS_ICON);


        if (cuentaParaEditar) {
            savingsAccountModalTitle.textContent = 'Editar Cuenta de Ahorro';
            savingsAccountIdEditInput.value = cuentaParaEditar.id;
            nombreSavingsAccountModalInput.value = cuentaParaEditar.nombre;
            objetivoSavingsAccountModalInput.value = cuentaParaEditar.objetivo || '';
            montoActualSavingsAccountModalInput.value = cuentaParaEditar.montoActual;
            monedaSavingsAccountModalSelect.value = cuentaParaEditar.moneda;
            renderizarIconPicker('icon-picker-savings-account', 'icon-savings-account-modal-input', cuentaParaEditar.icono || DEFAULT_SAVINGS_ICON);
        } else {
            savingsAccountModalTitle.textContent = 'Nueva Cuenta de Ahorro';
        }
        openModal(savingsAccountModal);
    }

    savingsAccountFormModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = savingsAccountIdEditInput.value || generateRandomId();
        const nombre = nombreSavingsAccountModalInput.value.trim();
        const objetivo = parseFloat(objetivoSavingsAccountModalInput.value) || 0;
        const montoActual = parseFloat(montoActualSavingsAccountModalInput.value) || 0;
        const moneda = monedaSavingsAccountModalSelect.value;
        const icono = iconSavingsAccountModalInput.value || DEFAULT_SAVINGS_ICON;

        if (!nombre || !moneda) {
            showMessage("El nombre y la moneda son obligatorios.", 'error');
            return;
        }

        const cuentaData = { id, nombre, objetivo, montoActual, moneda, icono };
        const esEdicion = Boolean(savingsAccountIdEditInput.value);

        if (esEdicion) {
            const index = cuentasAhorro.findIndex(sa => sa.id === id);
            cuentasAhorro[index] = cuentaData;
        } else {
            cuentasAhorro.push(cuentaData);
        }
        renderizarListaCuentasAhorro();
        renderizarDashboard(); 
        actualizarCamposTransaccionModal(); 
        guardarDatos();
        showMessage(esEdicion ? 'Cuenta de ahorro actualizada.' : 'Cuenta de ahorro creada.', 'success');
        closeModal(savingsAccountModal);
    });

    function renderizarListaCuentasAhorro() {
        listaCuentasAhorroEl.innerHTML = '';
        if (cuentasAhorro.length === 0) {
            noSavingsAccountsMessageEl.classList.remove('hidden');
            return;
        }
        noSavingsAccountsMessageEl.classList.add('hidden');

        cuentasAhorro.sort((a,b) => a.nombre.localeCompare(b.nombre)).forEach(sa => {
            const progreso = sa.objetivo > 0 ? Math.min((sa.montoActual / sa.objetivo) * 100, 100) : 0;
            const card = document.createElement('div');
            card.className = 'bg-white p-5 rounded-xl shadow-lg flex flex-col justify-between';
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center">
                            <span class="icon-display text-white text-lg mr-3 flex-shrink-0" style="background-color: #4A90E2;"> <i class="${sa.icono || DEFAULT_SAVINGS_ICON}"></i>
                            </span>
                            <h4 class="text-lg font-semibold text-gray-700 truncate" title="${sa.nombre}">${sa.nombre}</h4>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="editarCuentaAhorro('${sa.id}')" class="text-gray-500 hover:text-indigo-600 focusable" title="Editar"><i class="fas fa-edit"></i></button>
                            <button onclick="confirmarEliminarCuentaAhorro('${sa.id}')" class="text-gray-500 hover:text-red-600 focusable" title="Eliminar"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-green-600 mb-1">${formatCurrency(sa.montoActual, sa.moneda)}</p>
                    ${sa.objetivo > 0 ? `<p class="text-xs text-gray-500">Objetivo: ${formatCurrency(sa.objetivo, sa.moneda)}</p>` : ''}
                </div>
                ${sa.objetivo > 0 ? `
                <div class="mt-3">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-green-500 h-2.5 rounded-full" style="width: ${progreso}%"></div>
                    </div>
                    <p class="text-xs text-right text-gray-500 mt-1">${progreso.toFixed(0)}%</p>
                </div>` : '<div class="mt-3 h-[30px]"></div>'} `;
            listaCuentasAhorroEl.appendChild(card);
        });
    }
    window.editarCuentaAhorro = (id) => {
        const cuenta = cuentasAhorro.find(sa => sa.id === id);
        if (cuenta) abrirSavingsAccountModal(cuenta);
    };
    window.confirmarEliminarCuentaAhorro = (id) => {
        const cuenta = cuentasAhorro.find(sa => sa.id === id);
        if (!cuenta) return;
        const isUsedInTransactions = transacciones.some(t => t.fuenteCuentaAhorroId === id || t.cuentaAhorroDestinoId === id);
        const isUsedInAllocation = salaryAllocationRule.allocations.some(alloc => alloc.destinationType === 'savings_account' && alloc.destinationId === id);

        if (isUsedInTransactions || isUsedInAllocation) {
            showMessage(`La cuenta "${cuenta.nombre}" está en uso y no puede ser eliminada.`, 'error', 5000);
            return;
        }
        abrirConfirmationModal('Eliminar Cuenta de Ahorro', `¿Seguro que quieres eliminar la cuenta "${cuenta.nombre}"?`, () => eliminarCuentaAhorro(id));
    };
    function eliminarCuentaAhorro(id) {
        cuentasAhorro = cuentasAhorro.filter(sa => sa.id !== id);
        renderizarListaCuentasAhorro();
        renderizarDashboard();
        actualizarCamposTransaccionModal();
        guardarDatos();
        showMessage('Cuenta de ahorro eliminada.', 'success');
    }

    // --- CATEGORIES ---
    function abrirCategoryModal(catParaEditar = null) {
        categoryFormModal.reset();
        categoryIdEditInput.value = '';
        colorCategoryModalInput.value = '#FF6384'; 
        renderizarIconPicker('icon-picker-category', 'icon-category-modal-input', DEFAULT_CATEGORY_ICON);


        if (catParaEditar) {
            categoryModalTitle.textContent = 'Editar Categoría';
            categoryIdEditInput.value = catParaEditar.id;
            nombreCategoryModalInput.value = catParaEditar.nombre;
            colorCategoryModalInput.value = catParaEditar.color;
            renderizarIconPicker('icon-picker-category', 'icon-category-modal-input', catParaEditar.icono || DEFAULT_CATEGORY_ICON);
            if (catParaEditar.nombre === SALARY_CATEGORY_NAME) {
                nombreCategoryModalInput.readOnly = true;
                nombreCategoryModalInput.classList.add('bg-gray-100');
            } else {
                 nombreCategoryModalInput.readOnly = false;
                 nombreCategoryModalInput.classList.remove('bg-gray-100');
            }
        } else {
            categoryModalTitle.textContent = 'Nueva Categoría';
            nombreCategoryModalInput.readOnly = false;
            nombreCategoryModalInput.classList.remove('bg-gray-100');
        }
        openModal(categoryModal);
    }

    categoryFormModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = categoryIdEditInput.value || generateRandomId();
        const nombre = nombreCategoryModalInput.value.trim();
        const color = colorCategoryModalInput.value;
        const icono = iconCategoryModalInput.value || DEFAULT_CATEGORY_ICON;

        if (!nombre || !color) {
            showMessage("El nombre y el color son obligatorios.", 'error');
            return;
        }
        const existingCategory = categorias.find(c => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== id);
        if (existingCategory) {
            showMessage(`La categoría "${nombre}" ya existe.`, 'error');
            return;
        }

        const esEdicion = Boolean(categoryIdEditInput.value);
        const catData = { id, nombre, color, icono };

        if (esEdicion) {
            const index = categorias.findIndex(c => c.id === id);
            if (categorias[index].nombre === SALARY_CATEGORY_NAME && nombre !== SALARY_CATEGORY_NAME) {
                 showMessage(`No se puede cambiar el nombre de la categoría "${SALARY_CATEGORY_NAME}".`, 'error');
                 return;
            }
            categorias[index] = catData;
        } else {
            categorias.push(catData);
        }
        categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        renderizarListaCategoriasGestion();
        popularCategoriasDatalist();
        actualizarFiltroCategorias();
        guardarDatos();
        showMessage(esEdicion ? 'Categoría actualizada.' : 'Categoría creada.', 'success');
        closeModal(categoryModal);
    });

    function renderizarListaCategoriasGestion() {
        listaCategoriasGestionEl.innerHTML = '';
        if (categorias.length === 0) {
            noCategoriesMessageEl.classList.remove('hidden');
            return;
        }
        noCategoriesMessageEl.classList.add('hidden');

        categorias.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-lg shadow flex flex-col items-center text-center';
            card.innerHTML = `
                <span class="icon-display text-white text-2xl mb-2 w-12 h-12 rounded-full flex items-center justify-center" style="background-color: ${cat.color};">
                    <i class="${cat.icono || DEFAULT_CATEGORY_ICON}"></i>
                </span>
                <h5 class="text-md font-medium text-gray-700 truncate w-full" title="${cat.nombre}">${cat.nombre}</h5>
                <div class="mt-3">
                    <button onclick="editarCategoria('${cat.id}')" class="text-sm text-indigo-600 hover:text-indigo-800 focusable p-1" title="Editar"><i class="fas fa-edit"></i></button>
                    ${cat.nombre !== SALARY_CATEGORY_NAME ? `<button onclick="confirmarEliminarCategoria('${cat.id}')" class="text-sm text-red-500 hover:text-red-700 focusable p-1" title="Eliminar"><i class="fas fa-trash"></i></button>` : '<span class="p-1 w-6 inline-block"></span>'}
                </div>
            `;
            listaCategoriasGestionEl.appendChild(card);
        });
    }
    window.editarCategoria = (id) => {
        const cat = categorias.find(c => c.id === id);
        if (cat) abrirCategoryModal(cat);
    };
    window.confirmarEliminarCategoria = (id) => {
        const cat = categorias.find(c => c.id === id);
        if (!cat) return;
        if (cat.nombre === SALARY_CATEGORY_NAME) {
            showMessage(`La categoría "${SALARY_CATEGORY_NAME}" no se puede eliminar.`, 'error');
            return;
        }
        const isUsedInTransactions = transacciones.some(t => t.categoriaId === id);
        const isUsedInAllocation = salaryAllocationRule.allocations.some(alloc => alloc.destinationType === 'category' && alloc.destinationId === id);
        if (isUsedInTransactions || isUsedInAllocation) {
            showMessage(`La categoría "${cat.nombre}" está en uso y no puede ser eliminada.`, 'error', 5000);
            return;
        }
        abrirConfirmationModal('Eliminar Categoría', `¿Seguro que quieres eliminar la categoría "${cat.nombre}"?`, () => eliminarCategoria(id));
    };
    function eliminarCategoria(id) {
        categorias = categorias.filter(c => c.id !== id);
        renderizarListaCategoriasGestion();
        popularCategoriasDatalist();
        actualizarFiltroCategorias();
        guardarDatos();
        showMessage('Categoría eliminada.', 'success');
    }

    // --- DEBTS (Old Modal for Editing, New Wizard for Adding) ---
    function abrirDebtModalParaEdicion(debtParaEditar = null) { 
        debtFormModal.reset();
        debtIdEditInput.value = '';
        montoPagadoDebtModalInput.value = '0';
        fechaInicioDebtModalInput.valueAsDate = new Date(); 
        debtPagadaCheckbox.checked = false;
        populateCurrencySelect('moneda-debt-modal', currentDisplayCurrency);

        if (debtParaEditar) {
            debtModalTitle.textContent = 'Editar Deuda';
            debtIdEditInput.value = debtParaEditar.id;
            acreedorDebtModalInput.value = debtParaEditar.acreedor;
            montoTotalDebtModalInput.value = debtParaEditar.montoTotal;
            montoPagadoDebtModalInput.value = debtParaEditar.montoPagado;
            monedaDebtModalSelect.value = debtParaEditar.moneda;
            fechaInicioDebtModalInput.value = debtParaEditar.fechaInicio || '';
            fechaVencimientoDebtModalInput.value = debtParaEditar.fechaVencimiento || '';
            notasDebtModalInput.value = debtParaEditar.notas || '';
            debtPagadaCheckbox.checked = debtParaEditar.pagada || false;
        } else {
            debtModalTitle.textContent = 'Nueva Deuda (Antiguo)';
        }
        openModal(debtModal);
    }

    debtFormModal.addEventListener('submit', (e) => { 
        e.preventDefault();
        const id = debtIdEditInput.value; 
        if (!id) {
            showMessage("Error: No se encontró ID para editar la deuda.", "error");
            return;
        }
        const acreedor = acreedorDebtModalInput.value.trim();
        const montoTotal = parseFloat(montoTotalDebtModalInput.value);
        const montoPagado = parseFloat(montoPagadoDebtModalInput.value) || 0;
        const moneda = monedaDebtModalSelect.value;
        const fechaInicio = fechaInicioDebtModalInput.value;
        const fechaVencimiento = fechaVencimientoDebtModalInput.value;
        const notas = notasDebtModalInput.value.trim();
        const pagada = debtPagadaCheckbox.checked;

        if (!acreedor || !montoTotal || montoTotal <= 0 || !moneda) {
            showMessage("Acreedor, Monto Total y Moneda son obligatorios.", 'error');
            return;
        }
        if (montoPagado > montoTotal) {
            showMessage("El monto pagado no puede ser mayor al monto total.", 'error');
            return;
        }

        const debtData = { id, acreedor, montoTotal, montoPagado, moneda, fechaInicio, fechaVencimiento, notas, pagada };
        const index = deudas.findIndex(d => d.id === id);
        if (index !== -1) {
            deudas[index] = debtData;
            renderizarListaDeudas();
            renderizarDashboard(); 
            guardarDatos();
            showMessage('Deuda actualizada.', 'success');
            closeModal(debtModal);
        } else {
            showMessage("Error al actualizar la deuda: ID no encontrado.", "error");
        }
    });

    function renderizarListaDeudas() {
        listaDeudasGestionEl.innerHTML = '';
        if (deudas.length === 0) {
            noDebtsMessageEl.classList.remove('hidden');
            return;
        }
        noDebtsMessageEl.classList.add('hidden');

        deudas.sort((a,b) => (a.pagada - b.pagada) || (new Date(a.fechaVencimiento || '9999-12-31') - new Date(b.fechaVencimiento || '9999-12-31')) || a.acreedor.localeCompare(b.acreedor) )
        .forEach(d => {
            const montoRestante = d.montoTotal - d.montoPagado;
            const progreso = d.montoTotal > 0 ? (d.montoPagado / d.montoTotal) * 100 : (d.pagada ? 100 : 0);
            const card = document.createElement('div');
            card.className = `bg-white p-5 rounded-xl shadow-lg border-l-4 ${d.pagada ? 'border-green-400 opacity-70' : (montoRestante <=0 ? 'border-green-400' : 'border-red-400')}`;
            card.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-semibold text-gray-700 truncate" title="${d.acreedor}">${d.acreedor}</h4>
                    <div class="flex space-x-2">
                        <button onclick="editarDeuda('${d.id}')" class="text-gray-500 hover:text-indigo-600 focusable" title="Editar"><i class="fas fa-edit"></i></button>
                        <button onclick="confirmarEliminarDeuda('${d.id}')" class="text-gray-500 hover:text-red-600 focusable" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <p class="text-xl font-bold ${montoRestante <= 0 || d.pagada ? 'text-green-600' : 'text-red-600'} mb-1">
                    ${d.pagada ? 'Pagada' : formatCurrency(montoRestante, d.moneda) + ' restante'}
                </p>
                <p class="text-xs text-gray-500">Total: ${formatCurrency(d.montoTotal, d.moneda)} / Pagado: ${formatCurrency(d.montoPagado, d.moneda)}</p>
                ${d.fechaVencimiento ? `<p class="text-xs text-gray-500 mt-1">Vence: ${new Date(d.fechaVencimiento+'T00:00:00Z').toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p>` : ''}
                ${d.notas ? `<p class="text-xs text-gray-500 mt-1 truncate" title="${d.notas}">Notas: ${d.notas}</p>` : ''}
                <div class="mt-3">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="${d.pagada || montoRestante <= 0 ? 'bg-green-500' : 'bg-red-500'} h-2.5 rounded-full" style="width: ${progreso}%"></div>
                    </div>
                    <p class="text-xs text-right text-gray-500 mt-1">${progreso.toFixed(0)}% pagado</p>
                </div>
            `;
            listaDeudasGestionEl.appendChild(card);
        });
    }
    window.editarDeuda = (id) => { 
        const debt = deudas.find(d => d.id === id);
        if (debt) abrirDebtModalParaEdicion(debt);
    };
    window.confirmarEliminarDeuda = (id) => {
        const debt = deudas.find(d => d.id === id);
        if (!debt) return;
        abrirConfirmationModal('Eliminar Deuda', `¿Seguro que quieres eliminar la deuda con "${debt.acreedor}"?`, () => eliminarDeuda(id));
    };
    function eliminarDeuda(id) {
        deudas = deudas.filter(d => d.id !== id);
        renderizarListaDeudas();
        renderizarDashboard();
        guardarDatos();
        showMessage('Deuda eliminada.', 'success');
    }

    // --- NEW DEBT WIZARD LOGIC ---
    function resetDebtWizard() {
        wizardDebtData = {
            acreedor: '',
            montoTotal: '',
            moneda: debtWizardMonedaSelect.value || currentDisplayCurrency,
            montoPagado: '',
            fechaInicio: '',
            fechaVencimiento: '',
            notas: '',
            pagada: false
        };
        currentDebtWizardStep = 1;
        debtWizardForm.reset(); 
        debtWizardMonedaSelect.value = currentDisplayCurrency; 
        debtWizardPagadaCheckbox.checked = false;
        navigateToDebtWizardStep(1);
    }

    function navigateToDebtWizardStep(stepNumber) {
        currentDebtWizardStep = stepNumber;
        document.querySelectorAll('#debt-wizard-modal .wizard-step').forEach(step => step.classList.remove('active'));
        document.getElementById(`debt-wizard-step-${stepNumber}`).classList.add('active');
        debtWizardTitle.textContent = `Nueva Deuda (Paso ${stepNumber}/3)`;

        if (stepNumber === 1) {
            debtWizardAcreedorInput.value = wizardDebtData.acreedor || '';
            debtWizardMontoTotalInput.value = wizardDebtData.montoTotal || '';
            populateCurrencySelect('debt-wizard-moneda', wizardDebtData.moneda || currentDisplayCurrency);
        } else if (stepNumber === 2) {
            debtWizardMontoPagadoInput.value = wizardDebtData.montoPagado || '';
            debtWizardFechaInicioInput.value = wizardDebtData.fechaInicio || '';
            debtWizardFechaVencimientoInput.value = wizardDebtData.fechaVencimiento || '';
        } else if (stepNumber === 3) {
            debtWizardNotasInput.value = wizardDebtData.notas || '';
            debtWizardPagadaCheckbox.checked = wizardDebtData.pagada || false;
        }
    }

    function abrirDebtWizard() {
        resetDebtWizard();
        openModal(debtWizardModal);
    }

    if(addDebtMainBtn) addDebtMainBtn.addEventListener('click', abrirDebtWizard); 
    if(closeDebtWizardBtn) closeDebtWizardBtn.addEventListener('click', () => closeModal(debtWizardModal));

    if(debtWizardNextStep1Btn) debtWizardNextStep1Btn.addEventListener('click', () => {
        const acreedor = debtWizardAcreedorInput.value.trim();
        const montoTotal = parseFloat(debtWizardMontoTotalInput.value);
        if (!acreedor) { showMessage('El acreedor es obligatorio.', 'error'); return; }
        if (isNaN(montoTotal) || montoTotal <= 0) { showMessage('Ingresa un monto total válido.', 'error'); return; }
        wizardDebtData.acreedor = acreedor;
        wizardDebtData.montoTotal = montoTotal;
        wizardDebtData.moneda = debtWizardMonedaSelect.value;
        navigateToDebtWizardStep(2);
    });
    if(debtWizardCancelStep1Btn) debtWizardCancelStep1Btn.addEventListener('click', () => closeModal(debtWizardModal));

    if(debtWizardPrevStep2Btn) debtWizardPrevStep2Btn.addEventListener('click', () => navigateToDebtWizardStep(1));
    if(debtWizardNextStep2Btn) debtWizardNextStep2Btn.addEventListener('click', () => {
        wizardDebtData.montoPagado = parseFloat(debtWizardMontoPagadoInput.value) || 0;
        wizardDebtData.fechaInicio = debtWizardFechaInicioInput.value;
        wizardDebtData.fechaVencimiento = debtWizardFechaVencimientoInput.value;
        if (wizardDebtData.montoPagado < 0) wizardDebtData.montoPagado = 0;
        if (wizardDebtData.montoPagado > wizardDebtData.montoTotal) {
            showMessage('El monto pagado no puede ser mayor al monto total.', 'error');
            return;
        }
        navigateToDebtWizardStep(3);
    });
    if(debtWizardCancelStep2Btn) debtWizardCancelStep2Btn.addEventListener('click', () => closeModal(debtWizardModal));

    if(debtWizardPrevStep3Btn) debtWizardPrevStep3Btn.addEventListener('click', () => navigateToDebtWizardStep(2));
    if(debtWizardCancelStep3Btn) debtWizardCancelStep3Btn.addEventListener('click', () => closeModal(debtWizardModal));

    if(debtWizardForm) debtWizardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        wizardDebtData.notas = debtWizardNotasInput.value.trim();
        wizardDebtData.pagada = debtWizardPagadaCheckbox.checked;

        const newDebt = {
            id: generateRandomId(),
            acreedor: wizardDebtData.acreedor,
            montoTotal: wizardDebtData.montoTotal,
            montoPagado: wizardDebtData.montoPagado || 0,
            moneda: wizardDebtData.moneda,
            fechaInicio: wizardDebtData.fechaInicio || null,
            fechaVencimiento: wizardDebtData.fechaVencimiento || null,
            notas: wizardDebtData.notas || null,
            pagada: wizardDebtData.pagada || false
        };

        deudas.push(newDebt);
        renderizarListaDeudas();
        renderizarDashboard();
        guardarDatos();
        showMessage('Nueva deuda creada exitosamente.', 'success');
        closeModal(debtWizardModal);
    });


    // --- SALARY ALLOCATION ---
    function renderizarSalaryAllocationForm() {
        const salaryCat = categorias.find(c => c.nombre === SALARY_CATEGORY_NAME);
        if (!salaryCat) {
            salarioCategoryDisplayEl.value = "Categoría 'Salario' no encontrada. Por favor, créala.";
            allocationRulesContainerEl.innerHTML = '<p class="text-sm text-red-500">No se puede configurar la asignación sin una categoría "Salario".</p>';
            return;
        }
        salarioCategoryDisplayEl.value = salaryCat.nombre;
        salaryAllocationRule.salaryCategoryId = salaryCat.id;
        enableSalaryAllocationCheckboxEl.checked = salaryAllocationRule.enabled;
        allocationRulesContainerEl.innerHTML = '';
        let totalPercentage = 0;

        salaryAllocationRule.allocations.forEach((rule, index) => {
            const ruleDiv = document.createElement('div');
            ruleDiv.className = 'allocation-rule-item-container flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3';
            ruleDiv.innerHTML = `
                <div class="w-full sm:w-1/3">
                    <label for="alloc-type-${index}" class="sr-only">Tipo de Destino</label>
                    <select id="alloc-type-${index}" data-index="${index}" class="alloc-type-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm focusable">
                        <option value="category" ${rule.destinationType === 'category' ? 'selected' : ''}>Categoría (Gasto)</option>
                        <option value="savings_account" ${rule.destinationType === 'savings_account' ? 'selected' : ''}>Cuenta de Ahorro</option>
                    </select>
                </div>
                <div class="w-full sm:w-1/3">
                    <label for="alloc-dest-${index}" class="sr-only">Destino Específico</label>
                    <select id="alloc-dest-${index}" data-index="${index}" class="alloc-dest-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm focusable"></select>
                </div>
                <div class="w-full sm:w-1/6">
                    <label for="alloc-perc-${index}" class="sr-only">Porcentaje</label>
                    <input type="number" id="alloc-perc-${index}" data-index="${index}" value="${rule.percentage}" min="1" max="100" class="alloc-perc-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm focusable" placeholder="%">
                </div>
                <button type="button" data-index="${index}" class="remove-alloc-rule-btn text-red-500 hover:text-red-700 focusable p-2"><i class="fas fa-times"></i><span class="sr-only">Eliminar regla</span></button>
            `;
            allocationRulesContainerEl.appendChild(ruleDiv);
            populateAllocationDestinationSelect(index, rule.destinationType, rule.destinationId);
            totalPercentage += parseFloat(rule.percentage) || 0;
        });
        totalAllocatedPercentageEl.textContent = totalPercentage.toFixed(0);
        updateAllocationEventListeners();
    }

    function populateAllocationDestinationSelect(index, type, selectedId) {
        const destSelect = document.getElementById(`alloc-dest-${index}`);
        destSelect.innerHTML = '';
        if (type === 'category') {
            categorias.filter(c => c.nombre !== SALARY_CATEGORY_NAME).sort((a,b)=>a.nombre.localeCompare(b.nombre)).forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.nombre;
                if (cat.id === selectedId) option.selected = true;
                destSelect.appendChild(option);
            });
        } else if (type === 'savings_account') {
            cuentasAhorro.sort((a,b)=>a.nombre.localeCompare(b.nombre)).forEach(sa => {
                const option = document.createElement('option');
                option.value = sa.id;
                option.textContent = `${sa.nombre} (${sa.moneda})`;
                if (sa.id === selectedId) option.selected = true;
                destSelect.appendChild(option);
            });
        }
    }

    function updateAllocationEventListeners() {
        document.querySelectorAll('.alloc-type-select').forEach(sel => sel.addEventListener('change', handleAllocationTypeChange));
        document.querySelectorAll('.alloc-dest-select').forEach(sel => sel.addEventListener('change', handleAllocationDataChange));
        document.querySelectorAll('.alloc-perc-input').forEach(inp => inp.addEventListener('input', handleAllocationDataChange));
        document.querySelectorAll('.remove-alloc-rule-btn').forEach(btn => btn.addEventListener('click', handleRemoveAllocationRule));
    }

    function handleAllocationTypeChange(event) {
        const index = parseInt(event.target.dataset.index);
        const newType = event.target.value;
        salaryAllocationRule.allocations[index].destinationType = newType;
        salaryAllocationRule.allocations[index].destinationId = ''; 
        populateAllocationDestinationSelect(index, newType, null);
        updateTotalAllocatedPercentage();
    }
    function handleAllocationDataChange(event) {
        const index = parseInt(event.target.dataset.index);
        if (event.target.classList.contains('alloc-dest-select')) {
            salaryAllocationRule.allocations[index].destinationId = event.target.value;
        } else if (event.target.classList.contains('alloc-perc-input')) {
            salaryAllocationRule.allocations[index].percentage = parseFloat(event.target.value) || 0;
        }
        updateTotalAllocatedPercentage();
    }
    function handleRemoveAllocationRule(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        salaryAllocationRule.allocations.splice(index, 1);
        renderizarSalaryAllocationForm(); 
    }
    function updateTotalAllocatedPercentage() {
        let total = 0;
        salaryAllocationRule.allocations.forEach(rule => total += (parseFloat(rule.percentage) || 0));
        totalAllocatedPercentageEl.textContent = total.toFixed(0);
        if (total > 100) {
            totalAllocatedPercentageEl.classList.add('text-red-500');
            totalAllocatedPercentageEl.classList.remove('text-gray-700');
        } else {
            totalAllocatedPercentageEl.classList.remove('text-red-500');
            totalAllocatedPercentageEl.classList.add('text-gray-700');
        }
    }

    addAllocationRuleBtnEl.addEventListener('click', () => {
        salaryAllocationRule.allocations.push({
            destinationType: 'category',
            destinationId: categorias.find(c => c.nombre !== SALARY_CATEGORY_NAME)?.id || '',
            percentage: 10
        });
        renderizarSalaryAllocationForm();
    });

    salaryAllocationFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        let totalPercentage = 0;
        let isValid = true;
        salaryAllocationRule.allocations.forEach(rule => {
            totalPercentage += parseFloat(rule.percentage) || 0;
            if (!rule.destinationId || (parseFloat(rule.percentage) || 0) <=0) isValid = false;
        });

        if (!isValid) {
            showMessage('Todas las reglas de asignación deben tener un destino y un porcentaje mayor a 0.', 'error');
            return;
        }
        if (totalPercentage > 100) {
            showMessage('El porcentaje total asignado no puede exceder el 100%.', 'error');
            return;
        }
        salaryAllocationRule.enabled = enableSalaryAllocationCheckboxEl.checked;
        guardarDatos();
        showMessage('Configuración de asignación de salario guardada.', 'success');
    });

    function aplicarAsignacionSalario(salarioTransaccion) {
        if (!salaryAllocationRule.enabled || !salaryAllocationRule.allocations || salaryAllocationRule.allocations.length === 0) {
            return;
        }
        if (!salaryAllocationRule.salaryCategoryId || salarioTransaccion.categoriaId !== salaryAllocationRule.salaryCategoryId) {
            return;
        }

        let totalAsignado = 0;
        const nuevasTransaccionesAsignacion = [];

        salaryAllocationRule.allocations.forEach(rule => {
            const montoAsignado = parseFloat(((salarioTransaccion.monto * rule.percentage) / 100).toFixed(2));
            if (montoAsignado <= 0) return;

            totalAsignado += montoAsignado;

            if (rule.destinationType === 'category') {
                const categoriaDestino = categorias.find(c => c.id === rule.destinationId);
                if (categoriaDestino) {
                    nuevasTransaccionesAsignacion.push({
                        id: generateRandomId(),
                        tipo: 'gasto',
                        categoriaId: rule.destinationId,
                        monto: montoAsignado,
                        moneda: salarioTransaccion.moneda,
                        fecha: salarioTransaccion.fecha,
                        descripcion: `Asignación de salario a ${categoriaDestino.nombre}`,
                        esAsignacion: true,
                        origenTransaccionId: salarioTransaccion.id,
                        fuenteIngreso: null,
                        metodoPago: salarioTransaccion.fuenteIngreso, 
                        fuenteCuentaAhorroId: null,
                        cuentaAhorroDestinoId: null
                    });
                }
            } else if (rule.destinationType === 'savings_account') {
                const cuentaAhorroDestino = cuentasAhorro.find(sa => sa.id === rule.destinationId);
                if (cuentaAhorroDestino) {
                    if (cuentaAhorroDestino.moneda !== salarioTransaccion.moneda) {
                        showMessage(`Moneda de cuenta de ahorro "${cuentaAhorroDestino.nombre}" (${cuentaAhorroDestino.moneda}) no coincide con salario (${salarioTransaccion.moneda}). No se asignó.`, 'error', 5000);
                        return;
                    }
                    cuentaAhorroDestino.montoActual = parseFloat((cuentaAhorroDestino.montoActual + montoAsignado).toFixed(2));

                    nuevasTransaccionesAsignacion.push({
                        id: generateRandomId(),
                        tipo: 'asignacion', 
                        categoriaId: null, 
                        monto: montoAsignado,
                        moneda: salarioTransaccion.moneda,
                        fecha: salarioTransaccion.fecha,
                        descripcion: `Asignación de salario a cuenta ${cuentaAhorroDestino.nombre}`,
                        esAsignacion: true,
                        origenTransaccionId: salarioTransaccion.id,
                        fuenteIngreso: null,
                        metodoPago: null,
                        fuenteCuentaAhorroId: null,
                        cuentaAhorroDestinoId: cuentaAhorroDestino.id
                    });
                }
            }
        });

        if (nuevasTransaccionesAsignacion.length > 0) {
            transacciones.push(...nuevasTransaccionesAsignacion);
            showMessage(`${nuevasTransaccionesAsignacion.length} asignacion(es) de salario creadas.`, 'info');
        }
    }


    // --- DASHBOARD ---
    function renderizarDashboard() {
        let totalIngresos = 0;
        let totalGastos = 0;
        let saldoEfectivo = 0;
        let saldoTarjeta = 0;

        const hoy = new Date();
        const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        let ahorroMes = 0;

        transacciones.forEach(t => {
            if (t.moneda === currentDisplayCurrency) { 
                if (t.tipo === 'ingreso' && !t.esAsignacion) {
                    totalIngresos += t.monto;
                    if (t.fuenteIngreso === 'efectivo') saldoEfectivo += t.monto;
                    if (t.fuenteIngreso === 'tarjeta') saldoTarjeta += t.monto;
                    if (new Date(t.fecha) >= primerDiaMes && new Date(t.fecha) <= ultimoDiaMes) {
                        ahorroMes += t.monto;
                    }
                } else if (t.tipo === 'gasto' && !t.esAsignacion) {
                    totalGastos += t.monto;
                    if (t.fuenteCuentaAhorroId && t.fuenteCuentaAhorroId !== 'general') {
                        // Gasto desde cuenta de ahorro no afecta directamente saldo efectivo/tarjeta
                    } else if (t.metodoPago === 'efectivo') {
                        saldoEfectivo -= t.monto;
                    } else if (t.metodoPago === 'tarjeta') {
                        saldoTarjeta -= t.monto;
                    }
                    if (new Date(t.fecha) >= primerDiaMes && new Date(t.fecha) <= ultimoDiaMes) {
                        ahorroMes -= t.monto;
                    }
                }
            }
        });
        
        dbIngresosTotalesEl.textContent = formatCurrency(totalIngresos);
        dbGastosTotalesEl.textContent = formatCurrency(totalGastos);
        dbBalanceNetoEl.textContent = formatCurrency(totalIngresos - totalGastos);
        dbAhorroMesEl.textContent = formatCurrency(ahorroMes);
        dbSaldoEfectivoEl.textContent = formatCurrency(saldoEfectivo);
        dbSaldoTarjetaEl.textContent = formatCurrency(saldoTarjeta);

        const proximaSemana = new Date();
        proximaSemana.setDate(hoy.getDate() + 7);
        const pagosProximos = deudas.filter(d =>
            !d.pagada &&
            d.moneda === currentDisplayCurrency &&
            d.fechaVencimiento &&
            new Date(d.fechaVencimiento) >= hoy &&
            new Date(d.fechaVencimiento) <= proximaSemana
        ).length;
        dbProximosPagosEl.textContent = pagosProximos;

        renderizarGraficoGastosCategoriaDB();
        renderizarGraficoIngresosGastosMesDB();
        renderizarTransaccionesRecientesDB();

        const currencyInfo = CURRENCIES.find(c => c.code === currentDisplayCurrency) || CURRENCIES.find(c => c.code === DEFAULT_CURRENCY);
        dbIngresosTotalesLabelEl.textContent = `Ingresos Totales (${currencyInfo.symbol})`;
        dbGastosTotalesLabelEl.textContent = `Gastos Totales (${currencyInfo.symbol})`;
        dbBalanceNetoLabelEl.textContent = `Balance Neto (${currencyInfo.symbol})`;
        dbAhorroMesLabelEl.textContent = `Ahorro Neto Mes (${currencyInfo.symbol})`;
        dbSaldoEfectivoLabelEl.textContent = `Saldo Efectivo (${currencyInfo.symbol})`;
        dbSaldoTarjetaLabelEl.textContent = `Saldo Tarjeta (${currencyInfo.symbol})`;
        gastosCategoriaChartDbTitleEl.textContent = `Gastos por Categoría (${currencyInfo.symbol})`;
        ingresosGastosMesChartDbTitleEl.textContent = `Ingresos vs Gastos (${currencyInfo.symbol})`;
    }

    function renderizarGraficoGastosCategoriaDB() {
        const gastosPorCategoria = {};
        transacciones.filter(t => t.tipo === 'gasto' && !t.esAsignacion && t.moneda === currentDisplayCurrency).forEach(t => {
            const categoria = categorias.find(c => c.id === t.categoriaId) || { nombre: 'Desconocida', color: '#cccccc' };
            gastosPorCategoria[categoria.nombre] = (gastosPorCategoria[categoria.nombre] || 0) + t.monto;
        });

        const labels = Object.keys(gastosPorCategoria);
        const data = Object.values(gastosPorCategoria);
        const colors = labels.map(label => (categorias.find(c => c.nombre === label) || {color: '#cccccc'}).color);

        if (labels.length === 0) {
            gastosCategoriaChartDbNoDataEl.classList.remove('view-hidden');
            if (gastosCategoriaChartDb) gastosCategoriaChartDb.destroy();
            gastosCategoriaChartDb = null;
            return;
        }
        gastosCategoriaChartDbNoDataEl.classList.add('view-hidden');

        if (gastosCategoriaChartDb) gastosCategoriaChartDb.destroy();
        gastosCategoriaChartDb = new Chart(gastosCategoriaChartDbCanvas, {
            type: 'doughnut',
            data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: '#fff', borderWidth: 2 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom', labels:{ padding:15, font: {size: 10}} } } }
        });
    }

    function renderizarGraficoIngresosGastosMesDB() {
        const dataView = dbChartDataViewSelect.value; 
        const period = dbChartPeriodSelect.value;
        const grouping = dbChartGroupingSelect.value;
        let startDate, endDate;

        const today = new Date();
        today.setHours(0,0,0,0);

        if (period === 'custom') {
            dbChartCustomDateRangeEl.classList.remove('view-hidden');
            startDate = dbChartStartDateInput.value ? new Date(dbChartStartDateInput.value + 'T00:00:00Z') : null; 
            endDate = dbChartEndDateInput.value ? new Date(dbChartEndDateInput.value + 'T23:59:59Z') : null; 
            if (!startDate || !endDate || startDate > endDate) {
                 ingresosGastosMesChartDbNoDataEl.textContent = "Rango de fechas personalizado inválido.";
                 ingresosGastosMesChartDbNoDataEl.classList.remove('view-hidden');
                 if (ingresosGastosMesChartDb) ingresosGastosMesChartDb.destroy();
                 ingresosGastosMesChartDb = null;
                 return;
            }
        } else {
            dbChartCustomDateRangeEl.classList.add('view-hidden');
            endDate = new Date(today); 
            endDate.setHours(23,59,59,999);

            switch (period) {
                case 'current_month':
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                    break;
                case 'last_30_days':
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 29);
                    break;
                case 'last_3_months':
                    startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
                    break;
                case 'last_6_months':
                    startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
                    break;
                case 'current_year':
                    startDate = new Date(today.getFullYear(), 0, 1);
                    break;
                default: 
                    startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
            }
        }
        startDate.setHours(0,0,0,0);


        const filteredTransactions = transacciones.filter(t => {
            const txDate = new Date(t.fecha + 'T00:00:00Z'); 
            let matchesCurrencyAndDate = t.moneda === currentDisplayCurrency && txDate >= startDate && txDate <= endDate && !t.esAsignacion;
            if (!matchesCurrencyAndDate) return false;

            if (dataView === 'efectivo') {
                return (t.tipo === 'ingreso' && t.fuenteIngreso === 'efectivo') || (t.tipo === 'gasto' && t.metodoPago === 'efectivo' && (!t.fuenteCuentaAhorroId || t.fuenteCuentaAhorroId === 'general'));
            } else if (dataView === 'tarjeta') {
                return (t.tipo === 'ingreso' && t.fuenteIngreso === 'tarjeta') || (t.tipo === 'gasto' && t.metodoPago === 'tarjeta' && (!t.fuenteCuentaAhorroId || t.fuenteCuentaAhorroId === 'general'));
            }
            return true; 
        });


        if (filteredTransactions.length === 0) {
            ingresosGastosMesChartDbNoDataEl.textContent = "No hay datos para el período y moneda seleccionados.";
            ingresosGastosMesChartDbNoDataEl.classList.remove('view-hidden');
            if (ingresosGastosMesChartDb) ingresosGastosMesChartDb.destroy();
            ingresosGastosMesChartDb = null;
            return;
        }
        ingresosGastosMesChartDbNoDataEl.classList.add('view-hidden');

        const data = {}; 

        filteredTransactions.forEach(t => {
            const date = new Date(t.fecha + 'T00:00:00Z'); 
            let key;
            if (grouping === 'daily') {
                key = date.toISOString().split('T')[0];
            } else if (grouping === 'weekly') {
                const year = date.getUTCFullYear();
                const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
                const days = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
                const weekNumber = Math.ceil((days + firstDayOfYear.getUTCDay() + 1) / 7);
                key = `${year}-W${String(weekNumber).padStart(2, '0')}`;
            } else { // monthly
                key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
            }

            if (!data[key]) data[key] = { ingresos: 0, gastos: 0 };
            if (t.tipo === 'ingreso') data[key].ingresos += t.monto;
            else if (t.tipo === 'gasto') data[key].gastos += t.monto;
        });

        const sortedKeys = Object.keys(data).sort();
        const labels = sortedKeys;
        const ingresosData = sortedKeys.map(key => data[key].ingresos);
        const gastosData = sortedKeys.map(key => data[key].gastos);

        if (ingresosGastosMesChartDb) ingresosGastosMesChartDb.destroy();
        ingresosGastosMesChartDb = new Chart(ingresosGastosMesChartDbCanvas, {
            type: 'bar', 
            data: {
                labels,
                datasets: [
                    { label: 'Ingresos', data: ingresosData, backgroundColor: 'rgba(75, 192, 192, 0.6)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
                    { label: 'Gastos', data: gastosData, backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { x: { stacked: false, grid: { display: false } }, y: { stacked: false, beginAtZero: true, ticks: { callback: value => formatCurrency(value).replace(currentDisplayCurrency, '') } } }, 
                plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}` } } }
            }
        });
    }

    function renderizarTransaccionesRecientesDB() {
        dbListaTransaccionesRecientesEl.innerHTML = '';
        const recientes = transacciones
            .filter(t => t.moneda === currentDisplayCurrency && !t.esAsignacion) 
            .sort((a,b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 7);

        if (recientes.length === 0) {
            dbListaTransaccionesRecientesEl.innerHTML = '<li class="text-sm text-gray-500 text-center py-3">No hay transacciones recientes en esta moneda.</li>';
            return;
        }
        recientes.forEach(t => {
            const categoria = categorias.find(c => c.id === t.categoriaId) || { nombre: 'Desconocida', color: '#ccc', icono: DEFAULT_CATEGORY_ICON };
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors';
            li.innerHTML = `
                <div class="flex items-center truncate">
                    <span class="icon-display text-white text-sm mr-3 flex-shrink-0" style="background-color:${categoria.color};">
                        <i class="${categoria.icono}"></i>
                    </span>
                    <div class="truncate">
                        <p class="text-sm font-medium text-gray-700 truncate" title="${t.descripcion || categoria.nombre}">${t.descripcion || categoria.nombre}</p>
                        <p class="text-xs text-gray-500">${new Date(t.fecha+'T00:00:00Z').toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p>
                    </div>
                </div>
                <p class="text-sm font-semibold ${t.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'}">
                    ${t.tipo === 'ingreso' ? '+' : '-'}${formatCurrency(t.monto)}
                </p>
            `;
            dbListaTransaccionesRecientesEl.appendChild(li);
        });
    }

    // --- REPORTS ---
    function renderizarInformeSeleccionado() {
        const tipoInforme = reportTypeSelectEl.value;
        const fechaInicioStr = reportStartDateInputEl.value;
        const fechaFinStr = reportEndDateInputEl.value;

        // Destroy previous charts if they exist
        if (reportFlujoCajaChartInstance) { reportFlujoCajaChartInstance.destroy(); reportFlujoCajaChartInstance = null; }
        if (reportGastosCategoriaChartInstance) { reportGastosCategoriaChartInstance.destroy(); reportGastosCategoriaChartInstance = null; }
        if (reportIngresosVsGastosAnualChartInstance) { reportIngresosVsGastosAnualChartInstance.destroy(); reportIngresosVsGastosAnualChartInstance = null; }


        if ((tipoInforme !== 'resumen_deudas') && (!fechaInicioStr || !fechaFinStr)) {
            showMessage("Por favor, selecciona un rango de fechas para el informe.", "error");
            reportDisplayAreaEl.innerHTML = '<p class="text-center text-red-500 italic">Por favor, selecciona un rango de fechas.</p>';
            return;
        }
        
        const fechaInicio = new Date(fechaInicioStr + 'T00:00:00Z'); // Ensure UTC for date-only inputs
        const fechaFin = new Date(fechaFinStr + 'T23:59:59Z'); // Ensure UTC for date-only inputs

        if (tipoInforme !== 'resumen_deudas' && fechaInicio > fechaFin) {
            showMessage("La fecha de inicio no puede ser posterior a la fecha de fin.", "error");
             reportDisplayAreaEl.innerHTML = '<p class="text-center text-red-500 italic">La fecha de inicio no puede ser posterior a la fecha de fin.</p>';
            return;
        }

        reportDisplayAreaEl.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin fa-2x text-indigo-500"></i><p class="mt-2 text-gray-600">Generando informe...</p></div>';
        reportPlaceholderMessageEl.classList.add('view-hidden');

        setTimeout(() => {
            switch (tipoInforme) {
                case 'flujo_caja':
                    renderizarInformeFlujoCaja(fechaInicio, fechaFin, currentDisplayCurrency);
                    break;
                case 'gastos_categoria':
                    renderizarInformeGastosCategoria(fechaInicio, fechaFin, currentDisplayCurrency);
                    break;
                case 'evolucion_ahorros':
                    renderizarInformeEvolucionAhorros(fechaInicio, fechaFin, currentDisplayCurrency);
                    break;
                case 'resumen_deudas':
                    renderizarInformeResumenDeudas(currentDisplayCurrency);
                    break;
                case 'ingresos_vs_gastos_anual':
                    renderizarInformeIngresosVsGastosAnual(fechaInicio, fechaFin, currentDisplayCurrency);
                    break;
                default:
                    reportDisplayAreaEl.innerHTML = '<p class="text-center text-gray-500 italic">Tipo de informe no reconocido.</p>';
            }
        }, 200); 
    }

    function renderizarInformeFlujoCaja(startDate, endDate, currency) {
        const monthlyData = {}; // { 'YYYY-MM': { ingresos: X, gastos: Y, flujo: Z } }
        const relevantTransactions = transacciones.filter(t => {
            const txDate = new Date(t.fecha + 'T00:00:00Z');
            return t.moneda === currency && txDate >= startDate && txDate <= endDate && !t.esAsignacion;
        });

        relevantTransactions.forEach(t => {
            const monthKey = `${new Date(t.fecha).getUTCFullYear()}-${String(new Date(t.fecha).getUTCMonth() + 1).padStart(2, '0')}`;
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { ingresos: 0, gastos: 0, flujo: 0 };
            }
            if (t.tipo === 'ingreso') {
                monthlyData[monthKey].ingresos += t.monto;
            } else if (t.tipo === 'gasto') {
                monthlyData[monthKey].gastos += t.monto;
            }
        });

        const sortedMonths = Object.keys(monthlyData).sort();
        if (sortedMonths.length === 0) {
            reportDisplayAreaEl.innerHTML = `<h3 class="text-xl font-semibold mb-3">Informe de Flujo de Caja Mensual (${currency})</h3><p class="text-sm text-gray-600 mb-4">De ${startDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})} a ${endDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p><p class="text-center text-gray-500 italic">No hay datos para el período seleccionado.</p>`;
            return;
        }

        let tableHTML = `
            <h3 class="text-xl font-semibold mb-1">Informe de Flujo de Caja Mensual (${currency})</h3>
            <p class="text-sm text-gray-600 mb-4">De ${startDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})} a ${endDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p>
            <div class="overflow-x-auto">
                <table class="report-table">
                    <thead><tr><th>Mes</th><th>Ingresos</th><th>Gastos</th><th>Flujo Neto</th></tr></thead>
                    <tbody>`;
        
        const chartLabels = [];
        const ingresosChartData = [];
        const gastosChartData = [];
        const flujoChartData = [];
        let totalIngresosGeneral = 0;
        let totalGastosGeneral = 0;

        sortedMonths.forEach(month => {
            const data = monthlyData[month];
            data.flujo = data.ingresos - data.gastos;
            totalIngresosGeneral += data.ingresos;
            totalGastosGeneral += data.gastos;

            tableHTML += `<tr>
                            <td>${month}</td>
                            <td class="text-right text-green-600">${formatCurrency(data.ingresos, currency)}</td>
                            <td class="text-right text-red-600">${formatCurrency(data.gastos, currency)}</td>
                            <td class="text-right font-medium ${data.flujo >= 0 ? 'text-blue-600' : 'text-orange-600'}">${formatCurrency(data.flujo, currency)}</td>
                          </tr>`;
            chartLabels.push(month);
            ingresosChartData.push(data.ingresos);
            gastosChartData.push(data.gastos);
            flujoChartData.push(data.flujo);
        });
        const totalFlujoGeneral = totalIngresosGeneral - totalGastosGeneral;
        tableHTML += `</tbody>
                        <tfoot>
                            <tr>
                                <td>Total General</td>
                                <td class="text-right text-green-700">${formatCurrency(totalIngresosGeneral, currency)}</td>
                                <td class="text-right text-red-700">${formatCurrency(totalGastosGeneral, currency)}</td>
                                <td class="text-right font-bold ${totalFlujoGeneral >= 0 ? 'text-blue-700' : 'text-orange-700'}">${formatCurrency(totalFlujoGeneral, currency)}</td>
                            </tr>
                        </tfoot>
                      </table>
            </div>
            <div class="report-chart-container mt-6"><canvas id="report-flujo-caja-chart"></canvas></div>`;
        reportDisplayAreaEl.innerHTML = tableHTML;

        if (reportFlujoCajaChartInstance) reportFlujoCajaChartInstance.destroy();
        const ctx = document.getElementById('report-flujo-caja-chart').getContext('2d');
        reportFlujoCajaChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    { label: 'Ingresos', data: ingresosChartData, backgroundColor: 'rgba(75, 192, 192, 0.7)' },
                    { label: 'Gastos', data: gastosChartData, backgroundColor: 'rgba(255, 99, 132, 0.7)' },
                    { label: 'Flujo Neto', data: flujoChartData, type: 'line', borderColor: 'rgba(54, 162, 235, 1)', tension: 0.1, fill: false }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { callback: value => formatCurrency(value, currency) } } } }
        });
    }

    function renderizarInformeGastosCategoria(startDate, endDate, currency) {
        const gastosPorCategoria = {};
        const relevantTransactions = transacciones.filter(t => {
            const txDate = new Date(t.fecha + 'T00:00:00Z');
            return t.tipo === 'gasto' && t.moneda === currency && txDate >= startDate && txDate <= endDate && !t.esAsignacion;
        });

        relevantTransactions.forEach(t => {
            const categoria = categorias.find(c => c.id === t.categoriaId) || { nombre: 'Desconocida', color: '#cccccc', icono: 'fas fa-question-circle' };
            if (!gastosPorCategoria[categoria.id]) {
                gastosPorCategoria[categoria.id] = { nombre: categoria.nombre, monto: 0, color: categoria.color, icono: categoria.icono };
            }
            gastosPorCategoria[categoria.id].monto += t.monto;
        });

        const sortedCategorias = Object.values(gastosPorCategoria).sort((a, b) => b.monto - a.monto);

        if (sortedCategorias.length === 0) {
            reportDisplayAreaEl.innerHTML = `<h3 class="text-xl font-semibold mb-3">Informe de Gastos por Categoría (${currency})</h3><p class="text-sm text-gray-600 mb-4">De ${startDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})} a ${endDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p><p class="text-center text-gray-500 italic">No hay gastos para el período seleccionado.</p>`;
            return;
        }

        let tableHTML = `
            <h3 class="text-xl font-semibold mb-1">Informe de Gastos por Categoría (${currency})</h3>
            <p class="text-sm text-gray-600 mb-4">De ${startDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})} a ${endDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="overflow-x-auto">
                    <table class="report-table">
                        <thead><tr><th>Categoría</th><th>Monto Total</th></tr></thead>
                        <tbody>`;
        
        const chartLabels = [];
        const chartData = [];
        const chartColors = [];
        let totalGastosGeneral = 0;

        sortedCategorias.forEach(cat => {
            totalGastosGeneral += cat.monto;
            tableHTML += `<tr>
                            <td class="flex items-center"><span class="icon-display text-white text-xs mr-2 flex-shrink-0" style="background-color: ${cat.color};"><i class="${cat.icono}"></i></span>${cat.nombre}</td>
                            <td class="text-right">${formatCurrency(cat.monto, currency)}</td>
                          </tr>`;
            chartLabels.push(cat.nombre);
            chartData.push(cat.monto);
            chartColors.push(cat.color);
        });

        tableHTML += `</tbody>
                        <tfoot>
                            <tr>
                                <td>Total General</td>
                                <td class="text-right font-bold">${formatCurrency(totalGastosGeneral, currency)}</td>
                            </tr>
                        </tfoot>
                      </table>
                </div>
                <div class="report-chart-container"><canvas id="report-gastos-categoria-chart"></canvas></div>
            </div>`;
        reportDisplayAreaEl.innerHTML = tableHTML;

        if (reportGastosCategoriaChartInstance) reportGastosCategoriaChartInstance.destroy();
        const ctx = document.getElementById('report-gastos-categoria-chart').getContext('2d');
        reportGastosCategoriaChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{ data: chartData, backgroundColor: chartColors, borderColor: '#fff', borderWidth: 2 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'right', labels:{ padding:10, boxWidth:15, font: {size: 11}} } } }
        });
    }

    function renderizarInformeEvolucionAhorros(startDate, endDate, currency) {
        reportDisplayAreaEl.innerHTML = `<h3 class="text-xl font-semibold mb-3">Informe de Evolución de Ahorros (${currency})</h3> <p class="text-sm text-gray-600">De ${startDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})} a ${endDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p><p class="mt-4 text-center text-gray-500 italic">Este informe aún no está implementado.</p>`;
    }
    function renderizarInformeResumenDeudas(currency) {
        reportDisplayAreaEl.innerHTML = `<h3 class="text-xl font-semibold mb-3">Resumen de Deudas (${currency})</h3><p class="mt-4 text-center text-gray-500 italic">Este informe aún no está implementado.</p>`;
    }
    function renderizarInformeIngresosVsGastosAnual(startDate, endDate, currency) {
        reportDisplayAreaEl.innerHTML = `<h3 class="text-xl font-semibold mb-3">Informe Anual Ingresos vs Gastos (${currency})</h3> <p class="text-sm text-gray-600">De ${startDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})} a ${endDate.toLocaleDateString('es-ES', {timeZone: 'UTC'})}</p><p class="mt-4 text-center text-gray-500 italic">Este informe aún no está implementado.</p>`;
    }


    // --- DATA MANAGEMENT ---
    function exportAllData() {
        const dataToExport = {
            version: APP_VERSION,
            exportedAt: new Date().toISOString(),
            displayCurrency: currentDisplayCurrency,
            transactions: transacciones,
            categories: categorias,
            savingsAccounts: cuentasAhorro,
            debts: deudas,
            salaryAllocationRule: salaryAllocationRule
        };
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `gestor_financiero_pro_datos_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showMessage("Todos los datos exportados exitosamente.", "success");
    }

    function importAllData(event) {
        const file = event.target.files[0];
        if (!file) return;

        importedFileNameEl.textContent = `Archivo seleccionado: ${file.name}`;

        abrirConfirmationModal(
            'Importar Datos',
            `¿Estás seguro de que quieres importar datos desde "${file.name}"? Esto reemplazará TODOS los datos actuales.`,
            () => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importedData = JSON.parse(e.target.result);
                        if (!importedData.transactions || !importedData.categories || !importedData.savingsAccounts || !importedData.debts || !importedData.salaryAllocationRule || !importedData.displayCurrency) {
                            throw new Error("El archivo no tiene el formato esperado.");
                        }

                        if (importedData.version !== APP_VERSION) {
                            showMessage(`Importando datos de una versión diferente (${importedData.version || 'desconocida'}). Podrían existir incompatibilidades.`, 'info', 5000);
                        }

                        transacciones = importedData.transactions.map(tx => ({ 
                            ...tx,
                            fuenteCuentaAhorroId: tx.fuenteCuentaAhorroId || null,
                            fuenteIngreso: tx.fuenteIngreso || null,
                            metodoPago: tx.metodoPago || null
                        }));
                        categorias = importedData.categories.map(cat => ({...cat, icono: cat.icono || DEFAULT_CATEGORY_ICON}));
                        cuentasAhorro = importedData.savingsAccounts.map(sa => ({...sa, icono: sa.icono || DEFAULT_SAVINGS_ICON}));
                        deudas = importedData.debts;
                        salaryAllocationRule = importedData.salaryAllocationRule;
                        currentDisplayCurrency = importedData.displayCurrency || DEFAULT_CURRENCY;

                        const salaryCat = categorias.find(c => c.nombre === SALARY_CATEGORY_NAME);
                        if (salaryCat) {
                            salaryAllocationRule.salaryCategoryId = salaryCat.id;
                        } else { 
                            const defaultSalaryCat = DEFAULT_CATEGORIES.find(dc => dc.nombre === SALARY_CATEGORY_NAME);
                            if (defaultSalaryCat) {
                                const newSalaryCat = {...defaultSalaryCat, id: generateRandomId()};
                                categorias.unshift(newSalaryCat);
                                salaryAllocationRule.salaryCategoryId = newSalaryCat.id;
                            }
                        }


                        guardarDatos();
                        renderizarTodo();
                        cambiarVista('dashboard'); 
                        showMessage("Datos importados exitosamente.", "success");

                    } catch (error) {
                        showMessage("Error al importar el archivo: " + error.message, "error", 5000);
                        console.error("Error importing data:", error);
                    } finally {
                        importAllDataInput.value = ''; 
                        importedFileNameEl.textContent = '';
                    }
                };
                reader.readAsText(file);
            },
            () => { 
                 importAllDataInput.value = '';
                 importedFileNameEl.textContent = '';
            }
        );
    }

    function confirmDeleteAllData() {
         abrirConfirmationModal(
            'Borrar Todos los Datos',
            '¡ADVERTENCIA! Estás a punto de borrar permanentemente TODOS los datos de la aplicación (transacciones, categorías, cuentas, etc.) de este navegador. Esta acción no se puede deshacer. ¿Estás absolutamente seguro?',
            () => {
                Object.values(LS_KEYS).forEach(key => localStorage.removeItem(key));

                transacciones = [];
                categorias = [...DEFAULT_CATEGORIES.map(cat => ({ ...cat, id: cat.id || generateRandomId(), icono: cat.icono || DEFAULT_CATEGORY_ICON }))]; 
                cuentasAhorro = [];
                deudas = [];
                salaryAllocationRule = { enabled: false, salaryCategoryId: categorias.find(c=>c.nombre === SALARY_CATEGORY_NAME)?.id || null, allocations: [] };
                currentDisplayCurrency = DEFAULT_CURRENCY;

                guardarDatos(); 
                renderizarTodo();
                cambiarVista('dashboard');
                showMessage("Todos los datos han sido borrados.", "success");
            }
        );
    }

    // --- CONFIRMATION MODAL ---
    function abrirConfirmationModal(title, message, onConfirm, onCancel = null) {
        confirmationModalTitle.textContent = title;
        confirmationModalMessage.innerHTML = message; 
        currentConfirmCallback = onConfirm;
        confirmationModalConfirmBtn.onclick = () => {
            if (currentConfirmCallback) currentConfirmCallback();
            closeModal(confirmationModal);
        };
        confirmationModalCancelBtn.onclick = () => {
            if (onCancel) onCancel();
            closeModal(confirmationModal);
        };
        openModal(confirmationModal);
    }

    // --- Display Currency Change Handler ---
    function handleDisplayCurrencyChange(event) {
        currentDisplayCurrency = event.target.value;
        guardarDatos();
        renderizarDashboard();
        renderizarTablaTransacciones();
        showMessage(`Moneda de visualización cambiada a ${currentDisplayCurrency}.`, 'info');
    }


    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', () => {
        cargarDatos();
        const hoy = new Date();
        if (dbChartEndDateInput) dbChartEndDateInput.valueAsDate = hoy;
        if (dbChartStartDateInput) {
             let defaultStartCustom = new Date(hoy);
             defaultStartCustom.setDate(hoy.getDate() - 29);
             dbChartStartDateInput.valueAsDate = defaultStartCustom;
        }
        if(reportEndDateInputEl) reportEndDateInputEl.valueAsDate = new Date();
        if(reportStartDateInputEl) reportStartDateInputEl.valueAsDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        cambiarVista('dashboard');

        displayCurrencySelectEl.addEventListener('change', handleDisplayCurrencyChange);

        if (exportAllDataBtn) exportAllDataBtn.addEventListener('click', exportAllData);
        if (importAllDataBtn) importAllDataBtn.addEventListener('click', () => importAllDataInput.click());
        if (importAllDataInput) importAllDataInput.addEventListener('change', importAllData);
        if (deleteAllDataBtn) deleteAllDataBtn.addEventListener('click', confirmDeleteAllData);

        if(dbChartPeriodSelect) dbChartPeriodSelect.addEventListener('change', renderizarGraficoIngresosGastosMesDB);
        if(dbChartGroupingSelect) dbChartGroupingSelect.addEventListener('change', renderizarGraficoIngresosGastosMesDB);
        if(dbChartStartDateInput) dbChartStartDateInput.addEventListener('change', renderizarGraficoIngresosGastosMesDB);
        if(dbChartEndDateInput) dbChartEndDateInput.addEventListener('change', renderizarGraficoIngresosGastosMesDB);
        if(dbChartDataViewSelect) dbChartDataViewSelect.addEventListener('change', renderizarGraficoIngresosGastosMesDB);

        if(generateReportBtnEl) generateReportBtnEl.addEventListener('click', renderizarInformeSeleccionado);
        if(reportTypeSelectEl) {
            reportTypeSelectEl.addEventListener('change', () => {
                if (reportDisplayAreaEl) reportDisplayAreaEl.innerHTML = '';
                if (reportPlaceholderMessageEl && reportDisplayAreaEl) {
                    reportDisplayAreaEl.appendChild(reportPlaceholderMessageEl);
                    reportPlaceholderMessageEl.classList.remove('view-hidden');
                }
                const selectedReport = reportTypeSelectEl.value;
                const disableDates = selectedReport === 'resumen_deudas';
                if(reportStartDateInputEl) reportStartDateInputEl.disabled = disableDates;
                if(reportEndDateInputEl) reportEndDateInputEl.disabled = disableDates;
                if (disableDates) {
                    if(reportStartDateInputEl) reportStartDateInputEl.value = '';
                    if(reportEndDateInputEl) reportEndDateInputEl.value = '';
                } else {
                    if (reportStartDateInputEl && !reportStartDateInputEl.value) reportStartDateInputEl.valueAsDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                    if (reportEndDateInputEl && !reportEndDateInputEl.value) reportEndDateInputEl.valueAsDate = new Date();
                }
                 // Destroy previous charts when report type changes
                if (reportFlujoCajaChartInstance) { reportFlujoCajaChartInstance.destroy(); reportFlujoCajaChartInstance = null; }
                if (reportGastosCategoriaChartInstance) { reportGastosCategoriaChartInstance.destroy(); reportGastosCategoriaChartInstance = null; }
                if (reportIngresosVsGastosAnualChartInstance) { reportIngresosVsGastosAnualChartInstance.destroy(); reportIngresosVsGastosAnualChartInstance = null; }
            });
            reportTypeSelectEl.dispatchEvent(new Event('change'));
        }

        if (mobileMenuButton && sidebar && sidebarOverlay) {
            mobileMenuButton.addEventListener('click', () => {
                const isOpen = !sidebar.classList.contains('-translate-x-full');
                mobileMenuButton.setAttribute('aria-expanded', String(!isOpen));
                sidebar.classList.toggle('-translate-x-full');
                sidebarOverlay.classList.toggle('hidden', isOpen);
                document.body.style.overflow = isOpen ? '' : 'hidden';
            });
            sidebarOverlay.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                sidebarOverlay.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        }

        Object.keys(navLinks).forEach(key => {
            if (navLinks[key]) {
                navLinks[key].addEventListener('click', (e) => {
                    e.preventDefault();
                    cambiarVista(key);
                    if (window.innerWidth < 768 && sidebar && !sidebar.classList.contains('-translate-x-full')) {
                        sidebar.classList.add('-translate-x-full');
                        if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
                        if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                });
            }
        });

        if(openAddSavingsAccountModalBtn) openAddSavingsAccountModalBtn.addEventListener('click', () => abrirSavingsAccountModal());
        if(closeSavingsAccountModalBtn) closeSavingsAccountModalBtn.addEventListener('click', () => closeModal(savingsAccountModal));
        if(cancelSavingsAccountModalBtn) cancelSavingsAccountModalBtn.addEventListener('click', () => closeModal(savingsAccountModal));

        if(openAddCategoryModalBtn) openAddCategoryModalBtn.addEventListener('click', () => abrirCategoryModal());
        if(closeCategoryModalBtn) closeCategoryModalBtn.addEventListener('click', () => closeModal(categoryModal));
        if(cancelCategoryModalBtn) cancelCategoryModalBtn.addEventListener('click', () => closeModal(categoryModal));

        if(closeDebtModalBtn) closeDebtModalBtn.addEventListener('click', () => closeModal(debtModal)); 
        if(cancelDebtModalBtn) cancelDebtModalBtn.addEventListener('click', () => closeModal(debtModal)); 


        if(filterTipoTransaccionEl) filterTipoTransaccionEl.addEventListener('change', renderizarTablaTransacciones);
        if(filterCategoriaTransaccionEl) filterCategoriaTransaccionEl.addEventListener('change', renderizarTablaTransacciones);
        if(filterFuenteMetodoTransaccionEl) filterFuenteMetodoTransaccionEl.addEventListener('change', renderizarTablaTransacciones);
        if(exportCsvBtn) exportCsvBtn.addEventListener('click', exportTransactionsToCSV);


        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                if (transactionModal && !transactionModal.classList.contains('view-hidden')) closeModal(transactionModal);
                if (transactionWizardModal && !transactionWizardModal.classList.contains('view-hidden')) closeModal(transactionWizardModal);
                if (savingsAccountModal && !savingsAccountModal.classList.contains('view-hidden')) closeModal(savingsAccountModal);
                if (categoryModal && !categoryModal.classList.contains('view-hidden')) closeModal(categoryModal);
                if (debtModal && !debtModal.classList.contains('view-hidden')) closeModal(debtModal); 
                if (debtWizardModal && !debtWizardModal.classList.contains('view-hidden')) closeModal(debtWizardModal); 
                if (confirmationModal && !confirmationModal.classList.contains('view-hidden')) closeModal(confirmationModal);

                if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
                    sidebar.classList.add('-translate-x-full');
                    if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
                    if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    });