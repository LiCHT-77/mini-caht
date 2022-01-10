// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/LiCHT-77/mini-chat/message/ent/message"
)

// Message is the model entity for the Message schema.
type Message struct {
	config `json:"-"`
	// ID of the ent.
	ID int32 `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Type holds the value of the "type" field.
	Type message.Type `json:"type,omitempty"`
	// UserID holds the value of the "user_id" field.
	UserID int32 `json:"user_id,omitempty"`
	// RoomID holds the value of the "room_id" field.
	RoomID int32 `json:"room_id,omitempty"`
	// Text holds the value of the "text" field.
	Text string `json:"text,omitempty"`
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Message) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case message.FieldID, message.FieldUserID, message.FieldRoomID:
			values[i] = new(sql.NullInt64)
		case message.FieldType, message.FieldText:
			values[i] = new(sql.NullString)
		case message.FieldCreateTime, message.FieldUpdateTime:
			values[i] = new(sql.NullTime)
		default:
			return nil, fmt.Errorf("unexpected column %q for type Message", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Message fields.
func (m *Message) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case message.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			m.ID = int32(value.Int64)
		case message.FieldCreateTime:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field create_time", values[i])
			} else if value.Valid {
				m.CreateTime = value.Time
			}
		case message.FieldUpdateTime:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field update_time", values[i])
			} else if value.Valid {
				m.UpdateTime = value.Time
			}
		case message.FieldType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field type", values[i])
			} else if value.Valid {
				m.Type = message.Type(value.String)
			}
		case message.FieldUserID:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field user_id", values[i])
			} else if value.Valid {
				m.UserID = int32(value.Int64)
			}
		case message.FieldRoomID:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field room_id", values[i])
			} else if value.Valid {
				m.RoomID = int32(value.Int64)
			}
		case message.FieldText:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field text", values[i])
			} else if value.Valid {
				m.Text = value.String
			}
		}
	}
	return nil
}

// Update returns a builder for updating this Message.
// Note that you need to call Message.Unwrap() before calling this method if this Message
// was returned from a transaction, and the transaction was committed or rolled back.
func (m *Message) Update() *MessageUpdateOne {
	return (&MessageClient{config: m.config}).UpdateOne(m)
}

// Unwrap unwraps the Message entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (m *Message) Unwrap() *Message {
	tx, ok := m.config.driver.(*txDriver)
	if !ok {
		panic("ent: Message is not a transactional entity")
	}
	m.config.driver = tx.drv
	return m
}

// String implements the fmt.Stringer.
func (m *Message) String() string {
	var builder strings.Builder
	builder.WriteString("Message(")
	builder.WriteString(fmt.Sprintf("id=%v", m.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(m.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(m.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", type=")
	builder.WriteString(fmt.Sprintf("%v", m.Type))
	builder.WriteString(", user_id=")
	builder.WriteString(fmt.Sprintf("%v", m.UserID))
	builder.WriteString(", room_id=")
	builder.WriteString(fmt.Sprintf("%v", m.RoomID))
	builder.WriteString(", text=")
	builder.WriteString(m.Text)
	builder.WriteByte(')')
	return builder.String()
}

// Messages is a parsable slice of Message.
type Messages []*Message

func (m Messages) config(cfg config) {
	for _i := range m {
		m[_i].config = cfg
	}
}
