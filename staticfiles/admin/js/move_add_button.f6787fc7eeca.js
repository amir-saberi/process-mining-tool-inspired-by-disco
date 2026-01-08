/**
 * Move Add button from top of page into the actions toolbar
 * and replace action dropdown with Delete button
 */
(function () {
  "use strict";

  function getSelectedCount() {
    const checkboxes = document.querySelectorAll(
      'input[name="_selected_action"]:checked'
    );
    return checkboxes.length;
  }

  function updateDeleteButtonState(deleteBtn) {
    const selectedCount = getSelectedCount();
    if (deleteBtn) {
      deleteBtn.disabled = selectedCount === 0;
      const countText = deleteBtn.querySelector(".count-text");
      if (countText) {
        countText.textContent = selectedCount > 0 ? ` (${selectedCount})` : "";
      }
    }
  }

  function createDeleteButton() {
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "submit";
    deleteBtn.name = "action";
    deleteBtn.value = "delete_selected";
    deleteBtn.className = "delete-selected-btn";
    deleteBtn.title = "Delete selected items";

    const btnText = document.createElement("span");
    btnText.textContent = "Delete Selected";
    deleteBtn.appendChild(btnText);

    const countText = document.createElement("span");
    countText.className = "count-text";
    deleteBtn.appendChild(countText);

    // Initially disabled
    deleteBtn.disabled = true;

    return deleteBtn;
  }

  function setupDeleteButton() {
    const actionsForm = document.querySelector(".actions");

    if (!actionsForm) return;

    // Check if delete button already exists
    let deleteBtn = actionsForm.querySelector(".delete-selected-btn");

    if (!deleteBtn) {
      // Create and add delete button
      deleteBtn = createDeleteButton();
      actionsForm.appendChild(deleteBtn);
      console.log("✅ Delete button created");
    }

    // Update button state
    updateDeleteButtonState(deleteBtn);

    // Listen to checkbox changes
    const selectAllCheckbox = document.querySelector("#action-toggle");
    const itemCheckboxes = document.querySelectorAll(
      'input[name="_selected_action"]'
    );

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", () => {
        updateDeleteButtonState(deleteBtn);
      });
    }

    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateDeleteButtonState(deleteBtn);
      });
    });
  }

  function moveAddButtonToToolbar() {
    // Find the object-tools (Add button container)
    const objectTools = document.querySelector(".object-tools");
    
    if (!objectTools) {
      console.log("⚠️ No object-tools found");
      return;
    }

    // Try multiple strategies to find/create the right container
    
    // Strategy 1: Look for existing actions-toolbar
    let actionsToolbar = document.querySelector(".actions-toolbar");
    
    // Strategy 2: Look for actions form
    const actionsForm = document.querySelector("form.actions, .actions");
    
    if (actionsToolbar) {
      // Actions toolbar exists - just move object-tools there
      if (!actionsToolbar.contains(objectTools)) {
        actionsToolbar.appendChild(objectTools);
        console.log("✅ Add button moved to existing actions-toolbar");
      }
    } else if (actionsForm) {
      // Actions form exists but no toolbar wrapper
      
      // Check if actionsForm already has the right display style
      const computedStyle = window.getComputedStyle(actionsForm);
      if (computedStyle.display !== 'flex') {
        // Convert actionsForm itself into a toolbar
        actionsForm.classList.add('actions-toolbar');
        console.log("✅ Converted actions form to toolbar");
      }
      
      // Move object-tools into actionsForm
      if (!actionsForm.contains(objectTools)) {
        actionsForm.appendChild(objectTools);
        console.log("✅ Add button moved to actions form");
      }
    } else {
      // No actions form exists - create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "actions-toolbar";
      
      // Insert wrapper before object-tools
      objectTools.parentNode.insertBefore(wrapper, objectTools);
      wrapper.appendChild(objectTools);
      
      console.log("✅ Created new wrapper for Add button");
    }

    // Setup delete button
    setupDeleteButton();
    
    // Ensure object-tools has correct styling
    objectTools.style.display = 'inline-flex';
    objectTools.style.alignItems = 'center';
    objectTools.style.alignSelf = 'center';
  }

  // Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", moveAddButtonToToolbar);
  } else {
    moveAddButtonToToolbar();
  }

  // Also run after any AJAX operations (for Django admin inline forms)
  if (typeof django !== "undefined" && django.jQuery) {
    django.jQuery(document).on("formset:added", moveAddButtonToToolbar);
  }
  
  // Re-run after short delay to catch late-loading elements
  setTimeout(moveAddButtonToToolbar, 100);
  setTimeout(moveAddButtonToToolbar, 500);
})();
