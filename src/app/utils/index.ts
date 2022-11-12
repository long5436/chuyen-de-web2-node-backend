type Data = {
  data: Array<Object>;
  currentPage: number;
  totalPage: number;
};
class Utils {
  convertDataSequelize(data: Data) {
    return {
      totalPage: data.totalPage,
      currentPage: data.currentPage,
      data: data.data.map((items) => items.toJSON()),
    };
  }

  pagination(c: number, m: number) {
    const current = c;
    const last = m;
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
      if ((i === 1 || i === last || i >= left) && i < right) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    // console.log(c, m, rangeWithDots)
    rangeWithDots;

    const template = `
    <nav aria-label="Page navigation">
    <ul class="pagination">
       ${
         c !== 1
           ? `<li class="page-item">
       <a class="page-link" href="?page=${c - 1}" aria-label="Previous">
           <span aria-hidden="true">&laquo;</span>
       </a>
   </li>`
           : ''
       }
       
        ${rangeWithDots
          .map((e) => {
            if (e !== '...') {
              return `<li class="page-item"><a class="page-link ${
                c === e ? 'active' : ''
              }"  href="?page=${e}">${e}</a></li>`;
            } else {
              return `<li class="page-item"><a class="page-link">${e}</a></li>`;
            }
          })
          .toString()
          .replace(/\,/g, '')}
       
        ${
          c !== m
            ? `<li class="page-item">
        <a class="page-link" href="?page=${c + 1}" aria-label="Previous">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`
            : ''
        }
      
        
    </ul>
</nav>`;

    return template;
  }
}

export default new Utils();
