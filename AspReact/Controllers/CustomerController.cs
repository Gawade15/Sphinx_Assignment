using AspReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext _customerDbContext;

        public CustomerController(CustomerDbContext customerDbContext)
        {
            _customerDbContext = customerDbContext;
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _customerDbContext.Customers.ToListAsync();
        }

        [HttpPost]
        [Route("AddCustomer")]
        public async Task<Customer> AddCustomer(Customer objCustomer)
        {
            _customerDbContext.Customers.Add(objCustomer);
            await _customerDbContext.SaveChangesAsync();
            return objCustomer;
        }

        [HttpPatch]
        [Route("UpdateCustomer/{id}")]
        public async Task<Customer> UpdateCustomer(Customer objCustomer)
        {
            _customerDbContext.Entry(objCustomer).State = EntityState.Modified;
            await _customerDbContext.SaveChangesAsync();
            return objCustomer;
        }

        [HttpDelete]
        [Route("DeleteCustomer/{id}")]
        public bool DeleteCustomer(int id)
        {
            bool a ;
            var customer = _customerDbContext.Customers.Find(id);
            if (customer != null)
            {
                a = true;
                _customerDbContext.Entry(customer).State = EntityState.Deleted;
                _customerDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }
    }
}
