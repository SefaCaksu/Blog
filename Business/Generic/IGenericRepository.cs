using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Business.Generic
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<ICollection<T>> GetAllAsyn();
        T Get(int id);
        Task<T> GetAsync(int id);
        T Find(Expression<Func<T, bool>> match);
        Task<T> FindAsync(Expression<Func<T, bool>> match);        
        IQueryable<T> FindAll(Expression<Func<T, bool>> match);
        Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> match);
        int Count();
        Task<int> CountAsync();
        void Add(T t);
        void Update(T t, object key);
        void Delete(T entity);
        void Save();
        Task<int> SaveAsync();
    }
}