# Advanced Tables for Obsidian

Add improved navigation, formatting, and manipulation to markdown tables in Obsidian:

- Auto formatting
- Excel-like table navigation (tab/enter between cells and rows)
- [Spreadsheet formulas!](https://github.com/tgrosinger/advanced-tables-obsidian/blob/main/docs/help.md#using-formulas-in-markdown-tables)
- Add, remove, and move columns and rows
- Set column alignment (left, center, right)
- Sort rows by a specified column
- Export to CSV
- Works on Obsidian Mobile (See notes below)

## Demo

![basic functionality](https://raw.githubusercontent.com/tgrosinger/advanced-tables-obsidian/main/resources/screenshots/basic-functionality.gif)

## How to use

To create a table, create a single `|` character, then type the table's first
heading and press <kbd>Tab</kbd>. Continue entering headings and pressing
<kbd>Tab</kbd> until all the headings are created. Press <kbd>Enter</kbd> to
go to the first row. Continue filling cells as before, and press
<kbd>Enter</kbd> again for each new row.

When a cursor is in a markdown table...

| Hotkey                                            | Action                      |
| ------------------------------------------------- | --------------------------- |
| <kbd>Tab</kbd>                                    | Next Cell                   |
| <kbd>Shift</kbd> + <kbd>Tab</kbd>                 | Previous Cell               |
| <kbd>Enter</kbd>                                  | Next Row                    |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> | Open table controls sidebar |

Or use the command palette and search "Advanced Tables". There are many
commands available, don't forget to scroll!

## Rich Table Editor (Beta)

This plugin now includes a **Rich Table Editor** for Markdown tables:

- Visually edit tables in a dedicated modal window
- Resize columns with drag handles (column widths are saved as metadata)
- Edit cell contents directly, with clear Save/Cancel controls
- Table structure is validated before editing to prevent errors

**How to open:**
- Place your cursor inside a Markdown table and use the command palette to run **"Open Rich Table Editor"**

**In the modal:**
- Edit cells by typing
- Resize columns by dragging the handles in the header row
- Click **Save** to apply changes, or **Cancel** to discard

**Error handling and fallback:**
- If the table is malformed or partial, a warning is shown and the rich editor will not open
- Instead, a fallback modal appears showing the raw Markdown table with a button to copy it to the clipboard for manual editing

> **Note:** This feature is experimental. Please report bugs or suggestions to help improve the editor experience!

## Formulas and Spreadsheets in Markdown!

![formulas demo](https://raw.githubusercontent.com/tgrosinger/advanced-tables-obsidian/main/resources/screenshots/formulas-demo.gif)

For more information on using formulas, visit the
[Help Docs](https://github.com/tgrosinger/advanced-tables-obsidian/blob/main/docs/help.md).

## How to Install

### From within Obsidian

From Obsidian v0.9.8+, you can activate this plugin within Obsidian by doing the following:

- Open Settings > Third-party plugin
- Make sure Safe mode is **off**
- Click Browse community plugins
- Search for "Advanced Tables"
- Click Install
- Once installed, close the community plugins window and activate the newly installed plugin

## Obsidian Mobile

When using Obsidian on a mobile device, the Advanced Tables plugin can be used.
Using <kbd>Enter</kbd> and <kbd>Tab</kbd> to navigate the table will not work,
however you can add the "Next Cell" and "Next Row" commands to the mobile
toolbar and use them to navigate, or use the buttons from the sidebar.

## Pricing

This plugin is provided to everyone for free, however if you would like to
say thanks or help support continued development, feel free to send a little
my way through one of the following methods:

[![GitHub Sponsors](https://img.shields.io/github/sponsors/tgrosinger?style=social)](https://github.com/sponsors/tgrosinger)
[![Paypal](https://img.shields.io/badge/paypal-tgrosinger-yellow?style=social&logo=paypal)](https://paypal.me/tgrosinger)
[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="BuyMeACoffee" width="100">](https://www.buymeacoffee.com/tgrosinger)

## Notes

This is experimental and may have instability. It is possible that there are
bugs which may delete data in the current note. Please make backups!
