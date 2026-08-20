import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';
import styles from './sandbox.module.css';

/**
 * This gallery is hand-curated, so its labels live here rather than in the docs
 * front matter. They are translated through explicit ids.
 *
 * The ids are built at runtime, so `docusaurus write-translations` cannot
 * extract them. Their entries in i18n/<locale>/code.json are maintained by hand,
 * and are generated from the `sidebar_label` of each translated demo page.
 */
function demoLabelId(path: string): string {
  return `demos.item.${path.split('/').pop()!.replace(/\.html$/, '')}`;
}

const demoSidebar = {
  'CAD Systems': {
    'Canvas Editor': {
      image: 'polotno.jpg',
      path: 'sandbox/Canvas_Editor.html',
    },
    'Simple Window Frame': {
      image: 'simple-window.png',
      path: 'sandbox/Simple_Window_Frame.html',
    },
    'Window Frame Designer': {
      image: 'window.png',
      path: 'sandbox/Window_Frame_Designer.html',
    },
    'Seats Reservation': {
      image: 'seats-reservation.jpg',
      path: 'sandbox/Seats_Reservation.html',
    },
    'Drawing Labels on Image': {
      image: 'annotate.jpg',
      path: 'sandbox/Image_Labeling.html',
    },
    'Interactive Building Map': {
      image: 'building_map-min.png',
      path: 'sandbox/Interactive_Building_Map.html',
    },
  },
  'Tools': {
    'Signature Pad': {
      image: 'signature-pad.jpg',
      path: 'sandbox/Signature_Pad.html',
    },
    'Badge Maker': {
      image: 'badge-maker.jpg',
      path: 'sandbox/Badge_Maker.html',
    },
    'Rotate & Flip Image': {
      image: 'rotate-flip.jpg',
      path: 'sandbox/Rotate_Flip_Image.html',
    },
    'Infinite Canvas': {
      image: 'infinite-canvas.jpg',
      path: 'sandbox/Infinite_Canvas.html',
    },
    'Multiplayer Whiteboard': {
      image: 'multiplayer-whiteboard.svg',
      path: 'sandbox/Multiplayer_Whiteboard.html',
    },
    'Heatmap Generator': {
      image: 'heatmap-generator.jpg',
      path: 'sandbox/Heatmap_Generator.html',
    },
    'Crop Image': {
      image: 'crop-image.jpg',
      path: 'sandbox/Canvas_Crop_Image.html',
    },
    'Watermark': {
      image: 'watermark.jpg',
      path: 'sandbox/Canvas_Watermark.html',
    },
    'Canvas Overlay': {
      image: 'canvas-overlay.jpg',
      path: 'sandbox/Canvas_Overlay.html',
    },
    'Sticker Editor': {
      image: 'canvas-sticker.jpg',
      path: 'sandbox/Canvas_Sticker.html',
    },
  },
  'Games and Apps': {
    'Wheel of Fortune': {
      image: 'wheel-of-fortune-min.png',
      path: 'sandbox/Wheel_of_Fortune.html',
    },
    'Canvas Drawing': {
      image: 'free-drawing-min.png',
      path: 'sandbox/Free_Drawing.html',
    },
    'Animals on the Beach Game': {
      image: 'animals-min.png',
      path: 'sandbox/Animals_on_the_Beach_Game.html',
    },
    'Planets Image Map': {
      image: 'planet-min.png',
      path: 'sandbox/Planets_Image_Map.html',
    },
    'Physics Simulator': {
      image: 'simulator-min.png',
      path: 'sandbox/Physics_Simulator.html',
    },
  },
  'Common use cases': {
    'Editable Text': {
      image: 'editable_text-min.png',
      path: 'sandbox/Editable_Text.html',
    },
    'Rich Text rendering': {
      image: 'rich-text.jpg',
      path: 'sandbox/Rich_Text.html',
    },
    'Canvas Scrolling': {
      image: 'scroll.png',
      path: 'sandbox/Canvas_Scrolling.html',
    },
    'Scroll by Edge Drag': {
      image: 'scroll.png',
      path: 'sandbox/Scroll_By_Edge_Drag.html',
    },
    'Gif Animation': {
      image: 'gif.jpg',
      path: 'sandbox/GIF_On_Canvas.html',
    },
    'Display Video': {
      image: 'video.jpg',
      path: 'sandbox/Video_On_Canvas.html',
    },
    'SVG on Canvas': {
      image: 'svg_on_canvas.jpg',
      path: 'sandbox/SVG_On_Canvas.html',
    },
    'Canvas Background': {
      image: 'canvas-background.jpg',
      path: 'sandbox/Canvas_Background.html',
    },
    'Transparent Group': {
      image: 'transparent-group.jpg',
      path: 'sandbox/Transparent_Group.html',
    },
    'Flip Image': {
      image: 'mirror-shape.jpg',
      path: 'sandbox/Mirror_Canvas_Shape.html',
    },
    'Canvas to PDF': {
      image: 'pdf.jpg',
      path: 'sandbox/Canvas_to_PDF.html',
    },
    'Custom Font': {
      image: 'custom-font.png',
      path: 'sandbox/Custom_Font.html',
    },
    'Relative Pointer Position': {
      image: 'pointer.png',
      path: 'sandbox/Relative_Pointer_Position.html',
    },
    'Drop DOM Element': {
      image: 'drop.png',
      path: 'sandbox/Drop_DOM_Element.html',
    },
    'Objects Snapping': {
      image: 'objects_snapping.png',
      path: 'sandbox/Objects_Snapping.html',
    },
    'Zoom Relative To Pointer': {
      image: 'relative_zoom-min.png',
      path: 'sandbox/Zooming_Relative_To_Pointer.html',
    },
    'Constant Screen Size': {
      image: 'constant-screen-size.svg',
      path: 'sandbox/Constant_Screen_Size.html',
    },
    'Context Menu': {
      image: 'context.jpg',
      path: 'sandbox/Canvas_Context_Menu.html',
    },
    'Image Scale To Fit': {
      image: 'fit-image.jpg',
      path: 'sandbox/Scale_Image_To_Fit.html',
    },
    'Limit Resize and Drag': {
      image: 'resize-limit.jpg',
      path: 'sandbox/Limited_Drag_And_Resize.html',
    },
  },
  'Performance tests': {
    'Drag and Drop Stress Test': {
      image: 'drag_stress-min.png',
      path: 'sandbox/Drag_and_Drop_Stress_Test.html',
    },
    'Animation Stress Test': {
      image: 'animation_stress-min.png',
      path: 'sandbox/Animation_Stress_Test.html',
    },
    'Bunnies Stress Test': {
      image: 'bunnies.jpg',
      path: 'sandbox/Jumping_Bunnies.html',
    },
    '10000 Shapes with Tooltip': {
      image: 'tooltip_stress-min.png',
      path: 'sandbox/10000_Shapes_with_Tooltip.html',
    },
    '20000 Nodes': {
      image: '2000_nodes-min.png',
      path: 'sandbox/20000_Nodes.html',
    },
    'Resizing Stress Test': {
      image: 'resize_stress.jpg',
      path: 'sandbox/Resizing_Stress_Test.html',
    },
    'Quantum Squiggle': {
      image: 'squiggle-min.png',
      path: 'sandbox/Quantum_Squiggle.html',
    },
  },
  'Other random demos': {
    'Web Worker': {
      image: 'offscreen.jpg',
      path: 'sandbox/Web_Worker.html',
    },
    'Star Spinner': {
      image: 'spinner-min.png',
      path: 'sandbox/Star_Spinner.html',
    },
    'Connected Objects': {
      image: 'connected-objects.jpg',
      path: 'sandbox/Connected_Objects.html',
    },
    'Manual Image Resize': {
      image: 'image-resize-min.png',
      path: 'sandbox/Image_Resize.html',
    },
    'Stage Preview': {
      image: 'preview.jpg',
      path: 'sandbox/Stage_Preview.html',
    },
    'Modify Curves with Anchor Points': {
      image: 'modify-line-min.png',
      path: 'sandbox/Modify_Curves_with_Anchor_Points.html',
    },
    'Image Border': {
      image: 'border.jpg',
      path: 'sandbox/Image_Border.html',
    },
    'Collision Detection': {
      image: 'collision-min.png',
      path: 'sandbox/Collision_Detection.html',
    },
    'Elastic Stars': {
      image: 'stars-min.png',
      path: 'sandbox/Elastic_Stars.html',
    },
    'Shape Tango': {
      image: 'tango-min.png',
      path: 'sandbox/Shape_Tango.html',
    },
    'Image Border Highlighting': {
      image: 'border-min.png',
      path: 'sandbox/Image_Border_Highlighting.html',
    },
    'Zoom Layer On hover': {
      image: 'hover_zoom-min.png',
      path: 'sandbox/Zoom_Layer_On_hover.html',
    },
    'Responsive Canvas Stage': {
      image: 'responsive-min.png',
      path: 'sandbox/Responsive_Canvas.html',
    },
    'Touch Gestures': {
      image: 'gestures.jpg',
      path: 'sandbox/Gestures.html',
    },
    'Multi-touch Scale Shape': {
      image: 'multitouch-min.png',
      path: 'sandbox/Multi-touch_Scale_Shape.html',
    },
    'Multi-touch Scale Stage': {
      image: 'multitouch-min.png',
      path: 'sandbox/Multi-touch_Scale_Stage.html',
    },
    'Modify Shape Color on Click': {
      image: 'color_click-min.png',
      path: 'sandbox/Modify_Shape_Color_on_Click.html',
    },
    'Expand Images on Hover': {
      image: 'hover_expand-min.png',
      path: 'sandbox/Expand_Images_on_Hover.html',
    },
    'Shape Tooltip': {
      image: 'shape_tooltip-min.png',
      path: 'sandbox/Shape_Tooltips.html',
    },
    'Drag and Drop Multiple Shapes': {
      image: 'drag_multiple-min.png',
      path: 'sandbox/Drag_and_Drop_Multiple_Shapes.html',
    },
  },
};

const DemoGrid = ({
  section,
  items,
}: {
  section: string;
  items: Record<string, { image: string; path: string }>;
}) => {
  // Assets must go through withBaseUrl. A hardcoded "/assets/..." ignores the
  // site baseUrl, which is "/<locale>/" for every non-default locale.
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div>
      <h2>{translate({ id: `demos.section.${section}`, message: section })}</h2>
      <div>
        {Object.entries(items).map(([title, { image, path }]) => (
          <div key={title} className={`${styles.gridItem} ${styles.small}`}>
            {/* Link, not <a>: a raw anchor drops the active locale. */}
            <Link to={`/docs/${path}`}>
              <div
                className={styles.preview}
                style={{
                  backgroundImage: `url(${withBaseUrl(`/assets/demos/${image}`)})`,
                }}
              ></div>
              <div className={styles.description}>
                <h4>{translate({ id: demoLabelId(path), message: title })}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Demos() {
  return (
    <Layout
      title={translate({ id: 'demos.title', message: 'Demos' })}
      description={translate({
        id: 'demos.description',
        message:
          'Interactive demos and examples built with Konva.js — signature pads, image editors, games, drag-and-drop, animations, and more. Try them live in your browser.',
      })}
    >
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          <Translate id="demos.heading">Konva Demos</Translate>
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
          <Translate id="demos.intro">
            Interactive examples showing what you can build with Konva.js and HTML5 Canvas.
          </Translate>
        </p>
        {Object.entries(demoSidebar).map(([section, items]) => (
          <DemoGrid key={section} section={section} items={items} />
        ))}
      </div>
    </Layout>
  );
}
