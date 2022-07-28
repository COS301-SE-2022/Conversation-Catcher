import { selectPDFS,addPDF,removePDF} from './pdf.slice';

describe('pdf reducer', () => {
  it('returns an array',()=>{
    expect(selectPDFS([]).length).toEqual(0)
  }),
  it('adds a pdf',()=>{
    expect(addPDF({name:"Bob"}).payload).toContain({name:"Bob"})
  })
})