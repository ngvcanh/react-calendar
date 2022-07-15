import React from "react";
import Scrollbar from "./Scrollbar";
import CalendarProvider from "../Provider";
import { ComponentStory } from "@storybook/react";

export default {
  title: 'Components/Scrollbar',
  component: Scrollbar
}

const Template: ComponentStory<typeof Scrollbar> = args => {

  return <CalendarProvider>
    <div style={{ width: 400, height: 400, backgroundColor: '#888' }}>
      <Scrollbar>
        <p style={{ color: '#fff' }}>Felis, repudiandae, adipisicing provident do porta mollit, porttitor. Possimus cras. Nunc consequat fames vel occaecati veritatis corrupti, erat, do deleniti repellat fugit, varius veritatis maecenas facere quisquam fames iaculis tempore, soluta? Labore temporibus blanditiis excepteur nisl ultrices culpa, illo distinctio, lobortis consequat, cubilia dolores. Aliquip. Minim, nisi. Nulla. Vehicula, fugiat montes! Officia voluptate mollitia dolore similique, augue cumque aut eos. Primis aptent habitasse totam culpa viverra inceptos etiam reprehenderit eros, aenean convallis. Luctus elit commodo doloremque, nisi, rutrum culpa sociosqu, nibh necessitatibus, sapien fugit. Nullam! Laboris netus repudiandae, autem cupiditate, doloribus minus, metus fermentum praesentium iusto! Tenetur scelerisque tempus fringilla.</p>

        <p style={{ color: '#fff' }}>Rhoncus numquam placerat, diamlorem leo ex ullamco quia? Dis maxime molestias rerum magnam, veritatis sodales purus? Repudiandae totam? Soluta, iaculis, voluptatem et facilis primis. Nihil commodo quo veniam vehicula tempora senectus cupiditate dui? Sit! Officiis commodi? Sapien? Inventore, et diamlorem quos perferendis aliqua quaerat praesentium? Similique pretium ultricies consectetuer cum! Tenetur officia mi doloribus, ultrices cum excepturi illum pulvinar veniam mattis? Sapiente laboris culpa! Sollicitudin aperiam minus sem facilisi. Ea. Totam. Magni. Adipisci, doloremque. Lorem! Nostrud erat iste quo optio a parturient varius varius ultrices perferendis nam commodi? Urna elementum, aliquip turpis dis mattis dolores molestiae? Repudiandae dignissimos proin ante.</p>

        <p style={{ color: '#fff' }}>Iure interdum, ex auctor pulvinar sociosqu cursus non, sagittis risus cum minus officiis, lacinia, eum, tempus. Culpa, perferendis, quam leo debitis? Quisque vel assumenda similique aliquip! Donec, tincidunt? Ornare. Enim quaerat dapibus metus ut ipsum cupidatat? Magnis proin. Lobortis saepe. Cum dolorum! Hic voluptatibus quibusdam, porro magnam ipsa. Fermentum, hac, nostrud eget sit pellentesque. Fames, temporibus, sollicitudin! Mus, similique rutrum? Assumenda hendrerit curabitur temporibus facilisis doloremque tenetur laoreet quas aenean sint sequi in aperiam, fusce voluptatum nostrum nulla. Consequuntur magni adipiscing enim diamlorem voluptate, egestas possimus eros ligula eaque leo, autem sollicitudin eveniet incididunt debitis cursus! Tortor? Pharetra excepturi, mollit.</p>

        <p style={{ color: '#fff' }}>Magnis justo nostrum egestas, quasi wisi laborum mollis, dolore. Illo tempor, condimentum? Posuere pede vestibulum porttitor fusce quo, sequi risus nesciunt ad aliquid molestiae, repellendus dolore voluptatum? Tempor? Rutrum mus, repellat elementum voluptates convallis cubilia facilis, lacus diamlorem potenti, aliquam, laudantium sodales euismod praesent, fermentum repudiandae aptent luctus tempus ullamco et sapiente, orci duis tenetur litora, adipisci dapibus volutpat egestas, orci provident fusce sociis. Tristique adipiscing quae etiam laboris. Bibendum, pariatur faucibus. Cursus voluptas varius, tristique? Doloremque cum, dolorum adipisci arcu, laborum rerum aliquip et? Eligendi suspendisse! Nisl venenatis nibh! Ante? Dolorem arcu ducimus fugiat arcu, elementum laboris veniam magnis.</p>

        <p style={{ color: '#fff' }}>Explicabo deleniti, dolor veritatis dui neque metus elit, asperiores erat iaculis culpa dignissim laoreet semper, euismod? Pede pellentesque tempore leo occaecat laudantium numquam labore? Placeat tristique omnis fringilla? Ipsa occaecati natus alias orci quaerat hendrerit, laboriosam? Accumsan mollit facere imperdiet, integer senectus dolores vitae irure doloremque nunc veritatis? Pellentesque imperdiet consequuntur molestiae. Iusto interdum donec, taciti quae provident, posuere similique! Nemo felis facilisis aut auctor ultricies turpis fuga, iusto elit accusantium porttitor ac cum illum! Sem, quisquam sociis? Facere eu fugiat interdum, sapiente natus soluta nisl netus. Quia orci ex aperiam repellat reprehenderit fusce delectus dignissimos? Temporibus maiores, totam eum.</p>

        <p style={{ color: '#fff' }}>Netus diam asperiores labore natoque inventore illo, eaque asperiores iusto lorem tempore libero viverra ante, elementum labore rem, nostrud, commodo, sociis facere fusce adipiscing nam accumsan. Elementum omnis doloremque imperdiet. Veniam possimus massa? Excepteur faucibus, explicabo, dui nostrud sunt eius praesent, maxime. Recusandae mus sem error quos suspendisse eaque nemo. Reiciendis felis! Possimus cras. Animi soluta egestas, eligendi unde pede officia tellus atque! Exercitation occaecat diam quaerat quaerat nisl, eum duis nisi, sodales iste tempore dolore, modi, porta. Dolor inceptos rutrum? Explicabo pede consectetuer consequuntur eaque repudiandae, reprehenderit cupiditate nisl praesentium maxime cillum ut voluptates explicabo, nemo magnam, corrupti? At.</p>
      </Scrollbar>
    </div>
  </CalendarProvider>

}

const Default = Template.bind({});

export { Default }