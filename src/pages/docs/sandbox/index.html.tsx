import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';


const demoSidebar = {
  "CAD Systems": {
    "Canvas Editor": ["polotno.jpg", "sandbox/Canvas_Editor.html"],
    "Simple Window Frame": ["simple-window.png", "sandbox/Simple_Window_Frame.html"],
    "Floor Planner": ["floor-planner.png", "sandbox/Floor_Planner.html"],
    "Furniture Designer": ["furniture-designer.png", "sandbox/Furniture_Designer.html"],
    "Circuit Designer": ["circuit-designer.png", "sandbox/Circuit_Designer.html"]
  },
  "Games and Apps": {
    "Wheel of Fortune": ["wheel-of-fortune-min.png", "sandbox/Wheel_of_Fortune.html"],
    "Free Drawing": ["free-drawing-min.png", "sandbox/Free_Drawing.html"],
    "Tic Tac Toe": ["tic-tac-toe.png", "sandbox/Tic_Tac_Toe.html"],
    "Snake Game": ["snake-game.png", "sandbox/Snake_Game.html"],
    "Memory Card Game": ["memory-card.png", "sandbox/Memory_Card_Game.html"]
  },
  "Data Visualization": {
    "Bar Chart": ["bar-chart.png", "sandbox/Bar_Chart.html"],
    "Pie Chart": ["pie-chart.png", "sandbox/Pie_Chart.html"],
    "Line Graph": ["line-graph.png", "sandbox/Line_Graph.html"],
    "Scatter Plot": ["scatter-plot.png", "sandbox/Scatter_Plot.html"],
    "Heat Map": ["heat-map.png", "sandbox/Heat_Map.html"]
  },
  "Interactive Animations": {
    "Particle System": ["particle-system.png", "sandbox/Particle_System.html"],
    "Sprite Animation": ["sprite-animation.png", "sandbox/Sprite_Animation.html"],
    "Physics Simulation": ["physics-sim.png", "sandbox/Physics_Simulation.html"],
    "Drag and Drop": ["drag-drop.png", "sandbox/Drag_and_Drop.html"],
    "Morphing Shapes": ["morphing-shapes.png", "sandbox/Morphing_Shapes.html"]
  },
  "UI Components": {
    "Custom Slider": ["custom-slider.png", "sandbox/Custom_Slider.html"],
    "Color Picker": ["color-picker.png", "sandbox/Color_Picker.html"],
    "Resizable Panels": ["resizable-panels.png", "sandbox/Resizable_Panels.html"],
    "Custom Dropdown": ["custom-dropdown.png", "sandbox/Custom_Dropdown.html"],
    "Tooltip System": ["tooltip-system.png", "sandbox/Tooltip_System.html"]
  }
};

const DemoGrid = ({ section, items }: { section: string; items: Record<string, [string, string]> }) => (
  <div>
    <h2>{section}</h2>
    <div>
      {Object.entries(items).map(([title, [image, link]]) => (
        <div key={title} className={`${styles.gridItem} ${styles.small}`}>
          <a href={`/docs/${link}`}>
            <div className={styles.preview} style={{ backgroundImage: `url(/assets/demos/${image})` }}></div>
            <div className={styles.description}>
              <h4>{title}</h4>
            </div>
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default function Demos() {
  return (
    <Layout title="Konva Demos" description="Interactive Konva Demos">
      <div className="container">
        <h1>Konva Demos</h1>
        {Object.entries(demoSidebar).map(([section, items]) => (
          <DemoGrid key={section} section={section} items={items} />
        ))}
      </div>
    </Layout>
  );
}
