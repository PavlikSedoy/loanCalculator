document.getElementById('loan-form').addEventListener('submit', e => calculateResults(e))

/**
 * Calculate results
 * @param {Event} e 
 */
const calculateResults = e => {
    const amount = document.getElementById('amount'),
        interest = document.getElementById('interest'),
        years = document.getElementById('years')

    const monthlyPayment = document.getElementById('monthly-payment'),
        totalPayment = document.getElementById('total-payment'),
        totalInterest = document.getElementById('total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value)/100/12
    const calculatedPayments = parseFloat(years.value)*12

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal*x*calculatedInterest)/(x-1)

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
    } else {
        console.warning('Plese check your numbers')
    }

    e.preventDefault()
}