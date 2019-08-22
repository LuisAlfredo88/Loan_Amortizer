new Vue({
  el: '#app',
  data: {
    interest_rate: 10,
    amount: null,
    qty_months: null,
    total_payment_capital: 0,
    total_interest: 0,
    total_amount: 0,    
    amortization:[]
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    change_value:function(e){
      this[e.target.id] = e.target.value;
    },
    currencyFormat(value, decimals) {
      let val = (value/1).toFixed(decimals).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },    
    calculate: function(){
      var total_capital = this.amount;
      var qty_months = this.qty_months;
      var capital_distribution = total_capital / qty_months;
      var amortization = [];

      this.total_payment_capital = 0;
      this.total_interest = 0;
      this.total_amount = 0;

      for(var i = 0; i < qty_months; i++){
        var interest = total_capital * ( this.interest_rate / 100 );
        amortization.push({
          qty: i + 1,
          owed_capital: this.currencyFormat(total_capital, 2),
          capital: this.currencyFormat(capital_distribution, 2),
          interest: this.currencyFormat(interest, 2),
          total: this.currencyFormat(capital_distribution + interest, 2)
        });

        total_capital -= capital_distribution;
        this.total_payment_capital += capital_distribution;
        this.total_interest += interest;
        this.total_amount = this.total_payment_capital + this.total_interest;
      }

      this.amortization = amortization;
    },
    clear: function(){
      this.amount = null;
      this.qty_months = null;
      this.total_payment_capital = 0;
      this.total_interest = 0;
      this.total_amount = 0;    
      this.amortization =[]; 
    }
  }
})