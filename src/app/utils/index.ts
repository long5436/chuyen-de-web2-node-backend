import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import download from 'image-downloader';

type Data = {
  data: Array<Object>;
  currentPage: number;
  totalPage: number;
};

dotenv.config();
const serverUrl: string = process.env.SERVER_URL || '';

class Utils {
  convertDataSequelize(data: Data) {
    return {
      totalPage: data.totalPage,
      currentPage: data.currentPage,
      data: data.data.map((items) => {
        // @ts-ignore
        return items.toJSON();
      }),
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

  checkFileExit(fileName: string) {
    const pathFileCheck: string = path.join(global.__basedir, `public/other-image/${fileName}`);
    const check = fs.existsSync(pathFileCheck);
    return check;
  }

  saveFile(url: string) {
    if (!fs.existsSync(path.join(global.__basedir, 'public/other-image'))) {
      fs.mkdirSync(path.join(global.__basedir, 'public/other-image'));
    }

    const options = {
      url,
      dest: path.join(global.__basedir, 'public/other-image'),
    };

    download
      .image(options)
      .then(({ filename }) => {
        console.log('Saved image to', filename); // saved to /path/to/dest/image.jpg
      })
      .catch((err) => {
        // console.log(url);
        // console.error(err);
        console.log('Error => ' + err);
      });
  }

  handleImageDownload(fileName: string, url: string) {
    const splitFileName: string[] = fileName?.split('/');
    let result: string = '';
    let resultFileName: string = '';
    if (splitFileName) {
      resultFileName = splitFileName.length > 1 ? splitFileName[1] : splitFileName[0];
      result = `${serverUrl}/assets/other-image/${resultFileName}`;
    }

    if (!this.checkFileExit(resultFileName)) {
      this.saveFile(url);
    }

    return result;
  }
}

export default new Utils();
