document.getElementById('loan-form').addEventListener('submit', e => {
    // Hide results
    document.getElementById('results').style.display = 'none'

    // Show loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(e => calculateResults(e), 2000)

    e.preventDefault()
})

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

        // Show results
        document.getElementById('results').style.display = 'block'
        // Hide loader
        document.getElementById('loading').style.display = 'none'
    } else {
        // console.warning('Plese check your numbers')
        showError('Please check your numbers')
        // Hide loader
        document.getElementById('loading').style.display = 'none'
    }

    e.preventDefault()
}

/**
 * Show error
 * @param {String} error Error message
 */
const showError = error => {
    // Create div
    const errorDiv = document.createElement('div')

    // Get elements
    const card = document.querySelector('.card'),
        heading = document.querySelector('.heading')

    // Add class
    errorDiv.className = 'alert alert-danger'

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    // Insert error above heading
    card.insertBefore(errorDiv, heading)

    // Clear error after 3 seconds
    setTimeout(clearError, 3000)
}

/**
 * Clear error
 */
const clearError = () => {
    document.querySelector('.alert').remove()
}